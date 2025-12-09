// Socket.io connection
const socket = io({
  auth: {
    serverOffset: 0
  }
});

const messages = document.querySelector('#messages');
const form = document.querySelector('#chat-form');
const input = document.querySelector('#chat-input');

let lastMessageDate = null;

// Handle Enter key to send message
//TODO: add support for using send button to send message
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage(e);
  }
});

function getDateString(date) {
  const today = new Date();
  const messageDate = new Date(date);

  // Reset hours to compare just the date
  today.setHours(0, 0, 0, 0);
  messageDate.setHours(0, 0, 0, 0);

  const diffTime = today - messageDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';

  const day = new Date(date).getDate().toString().padStart(2, '0');
  const month = (new Date(date).getMonth() + 1).toString().padStart(2, '0');
  const year = new Date(date).getFullYear();
  return `${day}/${month}/${year}`;
}

socket.on('chat message', (timestamp, msg, serverOffset, senderId) => {
  // Add date divider if needed
  if (timestamp) {
    const messageDate = new Date(timestamp);
    const messageDateStr = messageDate.toDateString();

    if (lastMessageDate !== messageDateStr) {
      const divider = document.createElement('div');
      divider.classList.add('my-3', 'text-center');
      divider.innerHTML = `<div class="inline-block px-3 py-1 text-xs font-bold" style="background-color: #D3D3D3; border: 1px solid #808080; color: #000;">${getDateString(timestamp)}</div>`;
      messages.appendChild(divider);
      lastMessageDate = messageDateStr;
    }
  }

  const item = document.createElement('div');
  item.classList.add('mb-2');
  let timeString = '';
  if (timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    timeString = ` <span class="font-bold text-blue-700">(${hours}:${minutes})</span>`;
  }
  item.innerHTML = `<span class="font-bold text-blue-700">${senderId}${timeString}:</span> <span class="text-black">${msg}</span>`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
  socket.auth.serverOffset = serverOffset;
});

function sendMessage(e) {
  e.preventDefault();
  if (input.value) {
    const clientOffset = `${socket.id}-${Date.now()}`;
    socket.emit('chat message', new Date(), input.value, clientOffset, () => {
      // Message successfully sent
    });
    input.value = '';
  }
}

function sendWarn() {
  const warnMessage = "I'm calling the police!";
  const clientOffset = `${socket.id}-${Date.now()}`;
  socket.emit('chat message', new Date() , warnMessage, clientOffset, () => {
    // Warning message sent
  });
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
  messages.scrollTop = messages.scrollHeight;
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openLocationModal() {
  document.getElementById("locationModal").style.display = "block";
}

function closeLocationModal() {
  document.getElementById("locationModal").style.display = "none";
}

function openAboutUsModal() {
  document.getElementById("aboutUsModal").style.display = "block";
}

function closeAboutUsModal() {
  document.getElementById("aboutUsModal").style.display = "none";
}

function openArtistsModal() {
  document.getElementById("artistsModal").style.display = "block";
}

function closeArtistsModal() {
  document.getElementById("artistsModal").style.display = "none";
}

function openWorkshopsModal() {
  document.getElementById("workshopsModal").style.display = "block";
}

function closeWorkshopsModal() {
  document.getElementById("workshopsModal").style.display = "none";
}

function openGalleryModal() {
  document.getElementById("galleryModal").style.display = "block";
}

function closeGalleryModal() {
  document.getElementById("galleryModal").style.display = "none";
}

function openEnvironmentalModal() {
  document.getElementById("environmentalModal").style.display = "block";
}

function closeEnvironmentalModal() {
  document.getElementById("environmentalModal").style.display = "none";
}

function openTourModal() {
  document.getElementById("tourModal").style.display = "block";
}

function closeTourModal() {
  document.getElementById("tourModal").style.display = "none";
}

// Expose functions to global scope for inline onclick handlers
window.openForm = openForm;
window.closeForm = closeForm;
window.openLocationModal = openLocationModal;
window.closeLocationModal = closeLocationModal;
window.openAboutUsModal = openAboutUsModal;
window.closeAboutUsModal = closeAboutUsModal;
window.openArtistsModal = openArtistsModal;
window.closeArtistsModal = closeArtistsModal;
window.openWorkshopsModal = openWorkshopsModal;
window.closeWorkshopsModal = closeWorkshopsModal;
window.openGalleryModal = openGalleryModal;
window.closeGalleryModal = closeGalleryModal;
window.openEnvironmentalModal = openEnvironmentalModal;
window.closeEnvironmentalModal = closeEnvironmentalModal;
window.openTourModal = openTourModal;
window.closeTourModal = closeTourModal;
window.sendMessage = sendMessage;
window.sendWarn = sendWarn;