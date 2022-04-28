export const initialCards = [
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Мексика, Los Cabos',
    link: './images/los-cabos-mexico.jpg'
  },
  {
    name: 'Италия',
    link: './images/italy.jpg'
  },
  {
    name: 'Водопад',
    link: './images/falls-creek.jpg'
  }
];

// конфигурация переменных для валидации
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_active-error",
  errorClass: "popup__span-error_visible",
};
