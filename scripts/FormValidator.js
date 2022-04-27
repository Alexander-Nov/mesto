export class FormValidator {

  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._formSelector = validationConfig.formSelector,
    this._inputSelector = validationConfig.inputSelector,
    this._submitButtonSelector = validationConfig.submitButtonSelector,
    this._inactiveButtonClass = validationConfig.inactiveButtonClass,
    this._inputErrorClass = validationConfig.inputErrorClass,
    this._errorClass = validationConfig.errorClass,
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)),
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  };



  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      hideInputError(this._formElement, inputElement, this._validationConfig);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      disableSubmitButton(this._buttonElement, this._inactiveButtonClass);
    } else {
      enableSubmitButton(this._buttonElement, this._inactiveButtonClass);
    }
  };

  enableValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };
}

export function disableSubmitButton(buttonElement, inactiveButtonClass) {
  buttonElement.disabled = true;
  buttonElement.classList.add(inactiveButtonClass);
};

export function enableSubmitButton(buttonElement, inactiveButtonClass) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(inactiveButtonClass);
};

function hideInputError (formElement, inputElement, valConfig) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  errorElement.textContent = '';
  errorElement.classList.remove(valConfig.errorClass);
  inputElement.classList.remove(valConfig.inputErrorClass);
};

export function hideAllInputErrorsOnOpen (formElement, valConfig) {
  Array.from(formElement.querySelectorAll('.popup__input')).forEach(input => {
    hideInputError(formElement, input, valConfig);
  });
};
