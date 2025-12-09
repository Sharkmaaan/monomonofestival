import { ChatManager } from './ChatManager.js';
import { MessageRenderer } from './MessageRenderer.js';
import { ModalManager } from './ModalManager.js';

// Socket.io connection
const socket = io({
  auth: {
    serverOffset: 0
  }
});

// DOM elements
const messages = document.querySelector('#messages');
const input = document.querySelector('#chat-input');

// Initialize managers
const messageRenderer = new MessageRenderer(messages);
const chatManager = new ChatManager(socket, input, messageRenderer);
const modalManager = new ModalManager();

// Expose functions to global scope for inline onclick handlers
chatManager.exposeToWindow();
modalManager.exposeToWindow();
