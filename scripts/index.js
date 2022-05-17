import { initialCards, validationConfig } from './initial.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


// Переменные на странице
const profilePopup = document.querySelector(".popup_type_profile");  // Попап редактирования профиля
const profileEditForm = document.querySelector(".popup__form_type_profile");  // форма редактирования профиля
const cardPopup = document.querySelector(".popup_type_card");   // Попап добавления новой карточки
const newCardForm = document.querySelector(".popup__form_type_card"); // форма добавления новой карты, для отслеживания Submit
// const imagePopup = document.querySelector(".popup_type_image");   // Попап картинки
// const profileInfo = document.querySelector(".profile__info"); // раздел profile
// const currentName = profileInfo.querySelector(".profile__name"); //строка в profile с именем
// const currentProf = profileInfo.querySelector(".profile__description"); // строка в profile с профессией
// const cardsContainer = document.querySelector('.elements');        //секция для вывода карточек
// const popupList = Array.from(document.querySelectorAll('.popup')); // массив со списком всех попапов на странице

// Кнопки на самой странице
const buttonEditProfile = document.querySelector(".profile__edit-button");  // кнопка правки профиля
const buttonOpenCardPopup = document.querySelector(".profile__add-button");  // кнопка добавления новой карточки

//==profilePopup
// const buttonCloseProfile = profilePopup.querySelector(".popup__close-button");
const nameToBeDisplayed = profilePopup.querySelector(".popup__input-name");
const professionToBeDisplayed = profilePopup.querySelector(".popup__input-prof");
// const newNameInput = profilePopup.querySelector(".popup__input-name");
// const newProfessionInput = profilePopup.querySelector(".popup__input-prof");

//==cardPopup
// const buttonCloseCardPopup = cardPopup.querySelector(".popup__close-button");
const newCardName = cardPopup.querySelector(".popup__input-name");
const newCardLink = cardPopup.querySelector(".popup__input-prof");

//==imagePopup
// const buttonCloseImagePopup = imagePopup.querySelector(".popup__close-button");
// const titleImagePopup = imagePopup.querySelector(".popup__image-title");
// const fotoImagePopup = imagePopup.querySelector(".popup__image");

const popupItemEditProfile = new PopupWithForm (".popup_type_profile", {
  formSubmitter: (evt) => {
    evt.preventDefault();
    let newData = popupItemEditProfile._getInputValues();
    // console.log(newData);
    user.setUserInfo(newData);
    popupItemEditProfile.close();
  }
});

const user = new UserInfo ({nameSelector: ".profile__name", profSelector: ".profile__description"});

const popupItemAddNewCard = new PopupWithForm (".popup_type_card", {
  formSubmitter: (evt) => {
    evt.preventDefault();
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

function addNewCard (evt) {
  evt.preventDefault();
  const cardElement = prepareNewCard({name: newCardName.value, link: newCardLink.value}, '#cardTemplate', popupItemImage.open.bind(popupItemImage));
  cardsList.addItem(cardElement);
  popupItemAddNewCard.close();
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

newCardForm.addEventListener('submit', addNewCard);

const formProfileValidator = new FormValidator(profileEditForm, validationConfig);
formProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(newCardForm, validationConfig);
formAddCardValidator.enableValidation();
