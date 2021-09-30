import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor( { handleFormSubmit, popup} ) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formPopup = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  close() {
    super.close();

    this._formPopup.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }
}
