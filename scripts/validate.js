// конфигурация переменных для валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_active-error",
  errorClass: "popup__span-error_visible",
};

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
};

const hideAllInputErrorsOnOpen = (formElement, valConfig) => {
  Array.from(formElement.querySelectorAll('.popup__input')).forEach(input => {
    hideInputError(formElement, input, valConfig);
  });
};

const checkInputValidity = (formElement, inputElement, rest) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

const disableSubmitButton = (buttonElement, {inactiveButtonClass}) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(inactiveButtonClass);
};

const enableSubmitButton = (buttonElement, {inactiveButtonClass}) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(inactiveButtonClass);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, rest) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, rest);
  } else {
    enableSubmitButton(buttonElement, rest);
  }
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('sumbit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

enableValidation(validationConfig);
