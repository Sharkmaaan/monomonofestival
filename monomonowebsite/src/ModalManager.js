const ModalPasswordChecker = {
  password: 'Monomono2026',

  verify(inputPassword, onSuccess) {
    if (inputPassword === this.password) {
      onSuccess();
    } else {
      Swal.showValidationMessage('Incorrect password');
      return false;
    }
  },

  getWindowsStyle() {
    return {
      popup: 'windows-popup',
      title: 'windows-title',
      htmlContainer: 'windows-content',
      confirmButton: 'windows-button',
      cancelButton: 'windows-button',
      input: 'windows-input'
    };
  }
};

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
        modal.classList.remove('hidden');
      }
    }
  }

  close(modalKey) {
    const modalId = this.modals[modalKey];
    if (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('hidden');
      }
    }
  }

  exposeToWindow() {
    // Expose individual functions for backward compatibility with inline onclick handlers
    window.openForm = () => this.open('form');
    window.closeForm = () => this.close('form');
    
    //Location modal with password check
    window.openLocationModal = () => Swal.fire({
      title: 'Enter Password to access Location',
      input: 'password',
      theme:'auto',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: (pass) => ModalPasswordChecker.verify(pass, () => this.open('location')),
      allowOutsideClick: () => !Swal.isLoading(),
      customClass: ModalPasswordChecker.getWindowsStyle()
    });
    window.closeLocationModal = () => this.close('location');
    
    // Other modals
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
