import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor( { handleFormSubmit, popupSelector} ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formPopup = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__save-btn');
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

  renderLoading(isLoading, text) {
    if(isLoading) {
      this._submitText = this._submitButton.textContent;
      this._submitButton.textContent = text;
    }
    else {
      this._submitButton.textContent = this._submitText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }
}
