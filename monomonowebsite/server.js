import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { availableParallelism } from 'node:os';
import cluster from 'node:cluster';
import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter';
import { NicknameGenerator } from './src/namegenerator.js';
import { mkdirSync } from 'node:fs';

if (cluster.isPrimary) {
  const numCPUs = availableParallelism();
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({
      PORT: 3000 + i
    });
  }

  setupPrimary();
} else {
  // Create data directory if it doesn't exist
  try {
    mkdirSync('data', { recursive: true });
  } catch (err) {
    // Directory might already exist, ignore error
  }

  const nicknameGen = new NicknameGenerator();
  const db = await open({
    filename: 'data/chat.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
    );
  `);

  // If an older DB exists without `sender_id`, add the column so we can
  // persist which socket sent each message. This preserves existing data.
  const cols = await db.all("PRAGMA table_info('messages')");
  const hasSender = cols.some(c => c.name === 'sender_id');
  if (!hasSender) {
    await db.exec("ALTER TABLE messages ADD COLUMN sender_id TEXT;");
  }

  // Add timestamp column if it doesn't exist
  const hasTimestamp = cols.some(c => c.name === 'timestamp');
  if (!hasTimestamp) {
    await db.exec("ALTER TABLE messages ADD COLUMN timestamp TEXT;");
  }

  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    connectionStateRecovery: {},
    adapter: createAdapter()
  });

  const __dirname = dirname(fileURLToPath(import.meta.url));

  // Serve static files from the src directory
  app.use(express.static(join(__dirname, 'src')));
  app.use('/assets', express.static(join(__dirname, 'assets')));

  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'src/index.html'));
  });

  io.on('connection', async (socket) => {
    socket.on('chat message', async (timestamp, msg, clientOffset, callback) => {
      let result;
      try {
        result = await db.run('INSERT INTO messages (content, client_offset, sender_id, timestamp) VALUES (?, ?, ?, ?)', msg, clientOffset, socket.id, timestamp);
      } catch (e) {
        if (e.errno === 19 /* SQLITE_CONSTRAINT */ ) {
          callback();
        } else {
          // nothing to do, just let the client retry
        }
        return;
      }
      io.emit('chat message', timestamp, msg, result.lastID, nicknameGen.generate(socket.id));
      callback();
    });

    if (!socket.recovered) {
      try {
        await db.each('SELECT id, content, sender_id, timestamp FROM messages WHERE id > ?',
          [socket.handshake.auth.serverOffset || 0],
          (_err, row) => {
            socket.emit('chat message', row.timestamp, row.content, row.id, nicknameGen.generate(row.sender_id));
          }
        )
      } catch (e) {
        // something went wrong
      }
    }
  });

  const port = process.env.PORT;

  server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });
}