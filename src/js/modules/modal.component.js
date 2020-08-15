
export default class Modal {
    constructor(modalSel, buttonOpenSel, classShow='show', animationClass='fadeIn') {
       try{
			this.modal = document.querySelector(modalSel);
			this.buttonOpenSel = buttonOpenSel;
			this.modalSel = modalSel;
			this.buttonOpen = document.querySelector(buttonOpenSel);
			this.modalClose = this.modal.querySelector('[data-close]');
			this.classShow = classShow;
			this.animationClass = animationClass;
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
		this.modal.classList.add(this.classShow, 'animated',this.animationClass);
		document.body.style.overflow = 'hidden';
		this.onShow();
    }

    hide() {
		this.modal.classList.remove(this.classShow, 'animated', this.animationClass);
		document.body.style.overflow = '';
		this.onHide();
	}
	
	destroy() {
		if(_checkNodeList.call(this, this.buttonOpen)) {
			this.buttonOpen.forEach(button => {
				button.onclick =  null;
			});
		} else {
			this.buttonOpen.onclick =  null;
		}
		this.onDestroy();
	}


	showWithDelay(delay) {
		setTimeout(() => {
			let display = false;

			document.querySelectorAll('[data-modal]').forEach(modal => {
				if(modal.classList.contains(this.classShow)) display = true;
			});

			if(!display) this.emulatedClick();
		}, delay);
	}

	openByScroll() {
		const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

		window.onscroll = _calcScrollEnd.bind(this, scrollHeight);
	}

	emulatedClick() {
		_checkNodeList(this.buttonOpen) ? this.buttonOpen[0].click() : this.buttonOpen.click();
	}

	onShow() {
		return true
	}

	onHide() {}

	onDestroy() {}
}


function _buttonHandler(event) {
	event.preventDefault();
	this.show();
	this.modal.onclick = _modalHandler.bind(this);
	this.buttonPressed = true;
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

function _calcScrollEnd(scrollHeight) {
	if(window.pageYOffset + document.documentElement.clientHeight >= scrollHeight) {
		this.emulatedClick();
		window.onscroll = null;
	}
}