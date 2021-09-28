export class FormValidator {
  constructor(formsElement, settings) {
      this._formsElement = formsElement;
      this._formSelector = settings.formSelector;
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._errorClass = settings.errorClass;
  }

  _hasInvalidInput() {
      return this._inputs.some((inputElement) => {
          return !inputElement.validity.valid;
      })
  }

  _toggleButtonState() {
      if (this._hasInvalidInput()) {
          this._buttonElement.classList.add(this._inactiveButtonClass);
          this._buttonElement.setAttribute('disabled', true);
      } else {
          this._buttonElement.classList.remove(this._inactiveButtonClass);
          this._buttonElement.removeAttribute('disabled');
      }
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _showInputError(inputElement) {
    const errorElement = this._formsElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formsElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _inputHandler(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement);
  }
  else {
    this._hideInputError(inputElement);
      };
  }

  _setEventListeners() {
      this._inputs = Array.from(this._formsElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formsElement.querySelector(this._submitButtonSelector);

      this._toggleButtonState();

      this._inputs.forEach((inputElement) => {
          inputElement.addEventListener('input', (evt) => {
              this._inputHandler(inputElement);
              this._toggleButtonState();
          });
      });
  }

  enableValidation() {
    this._formsElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });

    this._setEventListeners();
  };
}
