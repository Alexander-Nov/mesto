const mexicoImage = new URL('../images/los-cabos-mexico.jpg', import.meta.url);
const italyImage = new URL('../images/italy.jpg', import.meta.url);
const fallsImage = new URL('../images/falls-creek.jpg', import.meta.url);

// конфигурация переменных для валидации
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_active-error",
  errorClass: "popup__span-error_visible",
};
