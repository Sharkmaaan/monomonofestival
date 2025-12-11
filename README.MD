# Monomono Festival Website

An interactive website for the Monomono festival in Turkey, featuring a retro Windows 95-inspired design with real-time chat functionality.

## Overview

Monomono is a festival website that combines nostalgic aesthetics with modern web technologies. The site provides festival information through interactive modals and enables visitors to connect via a real-time chat system powered by Socket.IO.

## Features

### Interactive Navigation
- **Location Portal** - Find the festival venue and directions
- **About Us** - Learn about Monomono festival and its mission
- **Artists** - Discover the talented performers
- **Workshops** - Explore hands-on learning opportunities
- **Gallery** - Browse photos from previous festivals
- **Environmental Values & House Rules** - Community guidelines and sustainability practices
- **Tour Suggestions** - Discover activities before and after the festival

### Real-Time Chat
- Live chat with other festival visitors
- Windows 95-style chat interface with MSN Messenger aesthetics
- Anonymous nicknames automatically generated for each user
- Persistent message history using SQLite
- Connection state recovery for seamless reconnection
- Timestamps and date dividers for message organization
- Clustered architecture for scalability

### Design
- Retro Windows 95/98 aesthetic with modern responsiveness
- Tailwind CSS for styling
- Custom Windows-style modals and UI elements
- Beautiful background imagery
- Colorful tent icons as navigation buttons

## Tech Stack

- **Backend**: Node.js with Express
- **Real-time Communication**: Socket.IO v4.8
- **Database**: SQLite3 for persistent message storage
- **Frontend**: Vanilla JavaScript with modern ES6+ features
- **Styling**: Tailwind CSS with custom Windows 95 theme
- **Alerts**: SweetAlert2 for user notifications
- **Architecture**: Cluster mode for multi-core scaling

## Project Structure

```
monomono-release/
├── monomonowebsite/
│   ├── assets/
│   │   ├── background.jpg
│   │   ├── circle.jpg
│   │   └── tent.png
│   ├── src/
│   │   ├── ChatManager.js         # Chat logic and message handling
│   │   ├── DateFormatter.js       # Date/time formatting utilities
│   │   ├── MessageRenderer.js     # Chat message rendering
│   │   ├── namegenerator.js       # Random nickname generation
│   │   ├── main.js                # Main application logic
│   │   ├── index.html             # Main HTML page
│   │   ├── input.css              # Tailwind input styles
│   │   ├── output.css             # Compiled Tailwind styles
│   │   └── windows95.css          # Windows 95 theme styles
│   ├── server.js                  # Express + Socket.IO server
│   ├── package.json
│   └── node_modules/
├── data/
│   └── chat.db                    # SQLite database (gitignored)
├── .gitignore
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher recommended)
- npm or yarn package manager

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd monomono-release/monomonowebsite
```

2. Install dependencies:
```bash
npm install
```

3. Build native dependencies (if needed):
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

The server will automatically spawn multiple worker processes based on your CPU cores for optimal performance.

## Configuration

The application uses clustering to leverage multiple CPU cores. Each worker process runs on a separate port (3000, 3001, etc.). The primary process manages workers and handles Socket.IO adapter coordination.

### Environment Variables
- `PORT` - Base port number for worker processes (default: 3000)

## Database

The application uses SQLite to persist chat messages. The database file is created automatically at `data/chat.db` with the following schema:

```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_offset TEXT UNIQUE,
  content TEXT,
  sender_id TEXT,
  timestamp TEXT
);
```

Messages are stored with:
- Unique client offset for deduplication
- Message content
- Sender socket ID (for nickname generation)
- ISO timestamp

## Chat Features

### Nickname Generation
Each user is assigned a random, memorable nickname using a combination of adjectives and nouns (e.g., "Brave Butterfly", "Cosmic Dancer"). Nicknames are consistently generated from the user's socket ID.

### Message Recovery
The chat system supports connection state recovery:
- Messages are persisted to SQLite
- On reconnection, users receive any missed messages
- Prevents duplicate message delivery using client offsets

### Clustering
The application uses Socket.IO cluster adapter to synchronize messages across multiple worker processes, ensuring scalability on multi-core systems.

## Development

### Building Styles
If you modify Tailwind styles in `input.css`, rebuild with:
```bash
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

### Code Structure
The application uses modern JavaScript with ES6 modules:
- **Object-Oriented Design**: Chat functionality is organized into classes (ChatManager, MessageRenderer, DateFormatter)
- **Socket.IO**: Handles real-time bidirectional communication
- **Express**: Serves static files and handles HTTP requests
- **Cluster Module**: Enables multi-process architecture

## Deployment

### Hosting Recommendations
The original notes mention:
- [Uptime Robot](https://uptimerobot.com/) - For monitoring uptime
- [Render.com](https://render.com) - For hosting the application

### Production Considerations
1. Use a process manager (PM2) for automatic restarts
2. Set up a reverse proxy (nginx) for better performance
3. Configure SSL/TLS certificates for HTTPS
4. Implement rate limiting for chat messages
5. Set up database backups
6. Configure logging and monitoring

## Browser Support

- Modern browsers with ES6+ support
- WebSocket support required
- Tested on Chrome, Firefox, Safari, Edge

## Contributing

This is a festival project. For contributions or improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

All rights reserved. This project is for the Monomono festival in Turkey.

## Credits

- Festival Organization: Monomono Team
- Design Inspiration: Windows 95/98 UI, MSN Messenger
- Icons and Graphics: Custom festival assets
- Chat System: Built with Socket.IO

## Support

For issues or questions about the festival, please contact the Monomono team.

---

**Built with ❤️ for the Monomono Festival community**
