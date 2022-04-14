const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__span-error_visible');
  inputElement.classList.add('popup__input_active-error');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove('popup__span-error_visible');
  inputElement.classList.remove('popup__input_active-error');
};

const hideAllInputErrorsOnClose = (formElement) => {
  Array.from(formElement.querySelectorAll('.popup__input')).forEach(input => {
    hideInputError(formElement, input);
  });
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('sumbit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const enableSubmitButton = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add('popup__submit-button_inactive');
};

const disableSubmitButton = (buttonElement) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove('popup__submit-button_inactive');
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    enableSubmitButton(buttonElement);
  } else {
    disableSubmitButton(buttonElement);
  }
};

enableValidation();
