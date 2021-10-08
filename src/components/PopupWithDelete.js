import Popup from './Popup.js';

export default class PopupWithDelete extends Popup {
  constructor(popup) {
    super(popup);
    this._popupButton = this._popup.querySelector('.popup__save-btn');
  }

  setSubmit() {
    this._handlerSubmit;
}

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.setSubmit();
    });
  }
}
