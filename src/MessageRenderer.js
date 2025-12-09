import { DateFormatter } from './DateFormatter.js';

export class MessageRenderer {
  constructor(messagesContainer) {
    this.messagesContainer = messagesContainer;
    this.lastMessageDate = null;
  }

  addDateDividerIfNeeded(timestamp) {
    if (!timestamp) return;

    const messageDate = new Date(timestamp);
    const messageDateStr = messageDate.toDateString();

    if (this.lastMessageDate !== messageDateStr) {
      const divider = document.createElement('div');
      divider.classList.add('my-3', 'text-center');
      divider.innerHTML = `<div class="inline-block px-3 py-1 text-xs font-bold" style="background-color: #D3D3D3; border: 1px solid #808080; color: #000;">${DateFormatter.getDateString(timestamp)}</div>`;
      this.messagesContainer.appendChild(divider);
      this.lastMessageDate = messageDateStr;
    }
  }

  renderMessage(timestamp, msg, senderId) {
    this.addDateDividerIfNeeded(timestamp);

    const item = document.createElement('div');
    item.classList.add('mb-2');

    let timeString = '';
    if (timestamp) {
      const date = new Date(timestamp);
      timeString = ` <span class="font-bold text-blue-700">(${DateFormatter.getTimeString(date)})</span>`;
    }

    item.innerHTML = `<span class="font-bold text-blue-700">${senderId}${timeString}:</span> <span class="text-black">${msg}</span>`;
    this.messagesContainer.appendChild(item);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}
