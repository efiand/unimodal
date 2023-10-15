export const FOCUSABLES = [
	'a[href]',
	'button:not(:disabled)',
	'input:not(:disabled)',
	'textarea:not(:disabled)',
	'select:not(:disabled)',
	'[tabindex]:not([tabindex^="-"])'
].join(', ');

export const getScrollbarWidth = () => {
	const scrollbarWidth = Math.max(window.innerWidth - document.documentElement.clientWidth, 0);
	return `${scrollbarWidth}px`;
};

export const initModals = (namePrefix = 'modal--') => {
	for (const modalElement of document.querySelectorAll('[data-modal]')) {
		new Modal(modalElement, namePrefix);
	}
};

export default class Modal {
	constructor(el, namePrefix = 'modal--') {
		this._el = el;
		this._id = this._el.dataset.modal;
		this._namePrefix = namePrefix;
		this._elSelector = `.${this._namePrefix.replace(/[-_]/g, '')}`;
		this._allFocusables = [];

		this._setListeners();

		this._el.classList.add(`${this._namePrefix}ready`);
	}

	get _firstFocusable() {
		const [firstFocusable] = this._el.querySelectorAll(FOCUSABLES);
		return firstFocusable;
	}

	_setListeners() {
		this._handleOpen = this._handleOpen.bind(this);
		this._handleBtnClose = this._handleBtnClose.bind(this);
		this._handleOverlayClose = this._handleOverlayClose.bind(this);
		this._handleKeyClose = this._handleKeyClose.bind(this);
		this._handleFocus = this._handleFocus.bind(this);

		this._el.addEventListener('click', this._handleOverlayClose);
		for (const opener of document.querySelectorAll(`[data-modal-open="${this._id}"]`)) {
			opener.addEventListener('click', this._handleOpen);
		}
		for (const closer of document.querySelectorAll(`[data-modal-close="${this._id}"]`)) {
			closer.addEventListener('click', this._handleBtnClose);
		}
	}

	_open() {
		document.documentElement.style.marginRight = getScrollbarWidth();
		document.documentElement.style.overflow = 'hidden';
		document.addEventListener('keydown', this._handleKeyClose);

		this._focusables = document.querySelectorAll(FOCUSABLES);
		for (const focusableEl of this._focusables) {
			focusableEl.addEventListener('focus', this._handleFocus);
		}

		this._el.classList.add(`${this._namePrefix}opened`);
	}

	_close() {
		this._el.classList.remove(`${this._namePrefix}opened`);

		document.removeEventListener('keydown', this._handleKeyClose);
		document.documentElement.style.marginRight = '0';
		document.documentElement.style.overflow = 'auto';

		for (const focusableEl of this._focusables) {
			focusableEl.removeEventListener('focus', this._handleFocus);
		}
	}

	_handleOpen(evt) {
		evt.preventDefault();
		this._open();
	}

	_handleBtnClose(evt) {
		evt.preventDefault();
		this._close();
	}

	_handleOverlayClose(evt) {
		if (evt.target === this._el) {
			this._close();
		}
	}

	_handleKeyClose(evt) {
		if (evt.key === 'Esc' || evt.key === 'Escape') {
			evt.preventDefault();
			this._close();
		}
	}

	_handleFocus() {
		if (document.activeElement.closest(this._elSelector) !== this._el) {
			this._firstFocusable.focus();
		}
	}
}
