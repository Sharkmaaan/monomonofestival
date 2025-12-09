export class ModalManager {
  constructor() {
    this.modals = {
      form: 'myForm',
      location: 'locationModal',
      aboutUs: 'aboutUsModal',
      artists: 'artistsModal',
      workshops: 'workshopsModal',
      gallery: 'galleryModal',
      environmental: 'environmentalModal',
      tour: 'tourModal'
    };
  }

  open(modalKey) {
    const modalId = this.modals[modalKey];
    if (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';
      }
    }
  }

  close(modalKey) {
    const modalId = this.modals[modalKey];
    if (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'none';
      }
    }
  }

  exposeToWindow() {
    // Expose individual functions for backward compatibility with inline onclick handlers
    window.openForm = () => this.open('form');
    window.closeForm = () => this.close('form');
    window.openLocationModal = () => this.open('location');
    window.closeLocationModal = () => this.close('location');
    window.openAboutUsModal = () => this.open('aboutUs');
    window.closeAboutUsModal = () => this.close('aboutUs');
    window.openArtistsModal = () => this.open('artists');
    window.closeArtistsModal = () => this.close('artists');
    window.openWorkshopsModal = () => this.open('workshops');
    window.closeWorkshopsModal = () => this.close('workshops');
    window.openGalleryModal = () => this.open('gallery');
    window.closeGalleryModal = () => this.close('gallery');
    window.openEnvironmentalModal = () => this.open('environmental');
    window.closeEnvironmentalModal = () => this.close('environmental');
    window.openTourModal = () => this.open('tour');
    window.closeTourModal = () => this.close('tour');
  }
}
