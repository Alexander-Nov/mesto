import { initialCards, validationConfig } from '../components/initial.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

// Переменные на странице
const profilePopup = document.querySelector(".popup_type_profile");  // Попап редактирования профиля
const profileEditForm = document.querySelector(".popup__form_type_profile");  // форма редактирования профиля
const cardPopup = document.querySelector(".popup_type_card");   // Попап добавления новой карточки
const newCardForm = document.querySelector(".popup__form_type_card"); // форма добавления новой карты, для отслеживания Submit
// Кнопки на странице
const buttonEditProfile = document.querySelector(".profile__edit-button");  // кнопка правки профиля
const buttonOpenCardPopup = document.querySelector(".profile__add-button");  // кнопка добавления новой карточки
const nameToBeDisplayed = profilePopup.querySelector(".popup__input-name");
const professionToBeDisplayed = profilePopup.querySelector(".popup__input-prof");
const newCardName = cardPopup.querySelector(".popup__input-name");
const newCardLink = cardPopup.querySelector(".popup__input-prof");

const popupItemEditProfile = new PopupWithForm (".popup_type_profile", {
  formSubmitter: (evt) => {
    evt.preventDefault();
    const newData = popupItemEditProfile._getInputValues();
    user.setUserInfo(newData);
    popupItemEditProfile.close();
  }
});

const user = new UserInfo ({nameSelector: ".profile__name", profSelector: ".profile__description"});

const popupItemAddNewCard = new PopupWithForm (".popup_type_card", {
  formSubmitter: (evt) => {
    evt.preventDefault();
    const cardElement = prepareNewCard({name: newCardName.value, link: newCardLink.value}, '#cardTemplate', popupItemImage.open.bind(popupItemImage));
    cardsList.addItem(cardElement);
    popupItemAddNewCard.close();
  }
});

const popupItemImage = new PopupWithImage (".popup_type_image");

function prepareProfilePopup() {
  const userData = user.getUserInfo();
  nameToBeDisplayed.value = userData.name;
  professionToBeDisplayed.value = userData.prof;
}

function prepareNewCard (card, templateSelector, imagePopupFunction) {
  const newCard = new Card(card, templateSelector, imagePopupFunction);
  const cardElement = newCard.createNewCard(); // вызываем функцию создания узла;
  return cardElement;
}

const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const cardElement = prepareNewCard(cardItem, '#cardTemplate', popupItemImage.open.bind(popupItemImage));
    cardsList.addItem(cardElement);
  },
},
'.elements'
);

cardsList.renderItems();

popupItemEditProfile.setEventListeners();
popupItemAddNewCard.setEventListeners();
popupItemImage.setEventListeners();

// слушатель на нажатие кнопки "Редактировать профиль"
buttonEditProfile.addEventListener('click', () => {
  formProfileValidator.hideAllInputErrorsOnOpen();
  prepareProfilePopup();
  formProfileValidator.enableSubmitButton();
  popupItemEditProfile.open();
});

// слушатель на нажатие кнопки "Добавить новую карточку"
buttonOpenCardPopup.addEventListener('click', () => {
  formAddCardValidator.hideAllInputErrorsOnOpen();
  formAddCardValidator.disableSubmitButton();
  popupItemAddNewCard.open();
});

const formProfileValidator = new FormValidator(profileEditForm, validationConfig);
formProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(newCardForm, validationConfig);
formAddCardValidator.enableValidation();
