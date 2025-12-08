// Socket.io connection
const socket = io({
  auth: {
    serverOffset: 0
  }
});

const messages = document.querySelector('#messages');
const form = document.querySelector('#chat-form');
const input = document.querySelector('#chat-input');

// Handle Enter key to send message
//TODO: add support for using send button to send message
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage(e);
  }
});

socket.on('chat message', (msg, serverOffset, senderId) => {
  const item = document.createElement('div');
  item.classList.add('mb-2');
  item.innerHTML = `<span class="font-bold text-blue-700">${senderId}:</span> <span class="text-black">${msg}</span>`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
  socket.auth.serverOffset = serverOffset;
});

function sendMessage(e) {
  e.preventDefault();
  if (input.value) {
    const clientOffset = `${socket.id}-${Date.now()}`;
    socket.emit('chat message', input.value, clientOffset, () => {
      // Message successfully sent
    });
    input.value = '';
  }
}

function sendWarn() {
  const warnMessage = "Better back off bro";
  const clientOffset = `${socket.id}-${Date.now()}`;
  socket.emit('chat message', warnMessage, clientOffset, () => {
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