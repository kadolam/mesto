import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(popup) {
    super(popup);
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  setSubmit(handle) {
    this._handlerSubmit = handle;
}

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerSubmit();
    });
  }
}
