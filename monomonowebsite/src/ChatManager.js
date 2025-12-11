import { MessageRenderer } from './MessageRenderer.js';

export class ChatManager {
  constructor(socket, inputElement, messageRenderer) {
    this.socket = socket;
    this.inputElement = inputElement;
    this.messageRenderer = messageRenderer;

    this.initializeSocketListeners();
    this.initializeInputListeners();
  }

  initializeSocketListeners() {
    this.socket.on('chat message', (timestamp, msg, serverOffset, senderId) => {
      this.messageRenderer.renderMessage(timestamp, msg, senderId);
      this.socket.auth.serverOffset = serverOffset;
    });
  }

  initializeInputListeners() {
    // Handle Enter key to send message
    // TODO: add support for using send button to send message
    this.inputElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage(e);
      }
    });
  }

  sendMessage(e) {
    e.preventDefault();
    if (this.inputElement.value) {
      const clientOffset = `${this.socket.id}-${Date.now()}`;
      this.socket.emit('chat message', new Date(), this.inputElement.value, clientOffset, () => {
        // Message successfully sent
      });
      this.inputElement.value = '';
    }
  }

  sendWarn() {
    const warnMessage = "I'm calling the police!";
    const clientOffset = `${this.socket.id}-${Date.now()}`;
    this.socket.emit('chat message', new Date(), warnMessage, clientOffset, () => {
      // Warning message sent
    });
  }

  exposeToWindow() {
    // Expose functions for backward compatibility with inline onclick handlers
    window.sendMessage = (e) => this.sendMessage(e);
    window.sendWarn = () => this.sendWarn();
  }
}
