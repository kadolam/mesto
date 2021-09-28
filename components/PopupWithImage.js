import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
  }

  open() {
    super.open();

    this._popupSelector.querySelector('.popup__img').src = this._link;
    this._popupSelector.querySelector('.popup__img').alt = this._name;
    this._popupSelector.querySelector('.popup__figcaption').textContent = this._name;
  }
}
