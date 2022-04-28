export class FormValidator {

  constructor(formElement, validationConfig) {
    this._formElement = formElement;
    this._validationConfig = validationConfig;
    this._formSelector = validationConfig.formSelector,
    this._inputSelector = validationConfig.inputSelector,
    this._submitButtonSelector = validationConfig.submitButtonSelector,
    this._inactiveButtonClass = validationConfig.inactiveButtonClass,
    this._inputErrorClass = validationConfig.inputErrorClass,
    this._errorClass = validationConfig.errorClass,
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)),
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
  }

  _showInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState () {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  enableValidation () {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  disableSubmitButton () {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  enableSubmitButton () {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  hideAllInputErrorsOnOpen () {
    Array.from(this._formElement.querySelectorAll('.popup__input')).forEach((input) => {
      this._hideInputError(input);
    });
  }
}
