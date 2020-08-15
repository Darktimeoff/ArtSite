import Modal from './modules/modal.component';
window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    const designModal = new Modal('.popup-design', '.button-design');
    designModal.modalDelegation({useButtonsClass: true});
    
    const consultationModal = new Modal('.popup-consultation', '.button-consultation');
    consultationModal.modalDelegation({useButtonsClass: true});
    //consultationModal.showWithDelay(2000)

    const giftModal = new Modal('.popup-gift', '.fixed-gift');
    giftModal.init();
    giftModal.openByScroll();
    giftModal.onShow = function() {
        giftModal.destroy();
        this.buttonOpen.remove();
    }
});