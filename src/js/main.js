import Modal from './modules/modal.component';
import sliders from './modules/slider.component';
import { forms } from './modules/form.component';
import { showMoreInfFromServer } from './modules/showmoreinf.component';
import calc from './modules/calc.component';
import tabs from './modules/tabs.component';
import changeImg from './modules/change-img.component';

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

    sliders('.feedback-slider', '.feedback-slider-item', 'horizontal', 'show', '.main-prev-btn', '.main-next-btn', true, 3000, true);
    sliders('.main-slider', '.main-slider-item', 'vertical', 'show');
    forms('form');  
    showMoreInfFromServer('.styles', '.row', '.button-styles');
    calc('.calc_form', '.calc-price');
    tabs('.portfolio', '.portfolio-menu', '.portfolio-wrapper');
    changeImg('.sizes', '.sizes-wrapper', '.sizes-block');
});