
export default class Modal {
    constructor(modalSel, buttonOpenSel, classShow='show', formClass='form') {
       try{
			this.modal = document.querySelector(modalSel);
			this.buttonOpenSel = buttonOpenSel;
			this.modalSel = modalSel;
			this.buttonOpen = document.querySelector(buttonOpenSel)
			this.modalClose = this.modal.querySelector('[data-close]');
			this.classShow = classShow;
			this.formElm = this.modal.querySelector('.' + formClass);
 	   } catch(e) {
			throw new Error("variables doesn't found");
	   }
    }

	modalDelegation(options) {
		if(options.useButtonsClass) {
			this.buttonOpen = document.querySelectorAll(this.buttonOpenSel);
			this.init();
		}

		if(options.useWrapperDelegationSel) {
			document.querySelector(options.useWrapperDelegationSel).addEventListener('click', _wrapperDelHandler.bind(this));
		}
	}

    init() {
		if(_checkNodeList.call(this, this.buttonOpen)) {
			this.buttonOpen.forEach(button => {
				button.onclick =  _buttonHandler.bind(this);
			});
		} else {
			this.buttonOpen.onclick =  _buttonHandler.bind(this);
		}
    }

    show() {
		this.modal.classList.add(this.classShow);
		document.body.style.overflow = 'hidden';
		this.onShow();
    }

    hide() {
		this.modal.classList.remove(this.classShow);
		document.body.style.overflow = '';
		this.onHide();
	}
	
	destroy() {
		this.onDestroy();
	}


	showWithDelay(delay) {
		setTimeout(() => {this.emulatedClick()}, delay);
	}

	emulatedClick() {
		typeof this.buttonOpen === 'object' ? this.buttonOpen[0].click() : this.buttonOpen.click();
	}

	onShow() {}

	onHide() {}

	onDestroy() {}
}


function _buttonHandler(event) {
	event.preventDefault();
	this.show();
	this.modal.onclick = _modalHandler.bind(this);
}
function _checkNodeList(array) {
	return Boolean(array instanceof NodeList);
}
function _modalHandler(event) {
	_modalClose.call(this, event);
}

function _modalClose(event) {
	const target = event.target;
	if(target && (target.closest('[data-close]') === this.modalClose)) {
		this.hide();
	}

	if(target && (target === this.modal)) {
		this.hide();
	}
}

function _wrapperDelHandler(e) {
	if(e.target && e.target.classList.contains(this.buttonOpenSel.slice(1))) {
		_buttonHandler.call(this, e);
	}
}