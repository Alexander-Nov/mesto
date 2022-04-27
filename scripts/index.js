import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { disableSubmitButton } from './FormValidator.js';
import { enableSubmitButton } from './FormValidator.js';
import { hideAllInputErrorsOnOpen } from './FormValidator.js';

// Переменные на странице
const profilePopup = document.querySelector(".popup_type_profile");  // Попап редактирования профиля
const profileEditForm = document.querySelector(".popup__form_type_profile");  // форма редактирования профиля
const cardPopup = document.querySelector(".popup_type_card");   // Попап добавления новой карточки
const newCardForm = document.querySelector(".popup__form_type_card"); // форма добавления новой карты, для отслеживания Submit
const inputListCardForm = Array.from(newCardForm.querySelectorAll('.popup__input'));
const imagePopup = document.querySelector(".popup_type_image");   // Попап картинки
const profileInfo = document.querySelector(".profile__info"); // раздел profile
const currentName = profileInfo.querySelector(".profile__name"); //строка в profile с именем
const currentProf = profileInfo.querySelector(".profile__description"); // строка в profile с профессией
const cardTemplate = document.querySelector('#cardTemplate').content; //разметка внутри шаблона
const cardsContainer = document.querySelector('.elements');        //секция для вывода карточек
const popupList = Array.from(document.querySelectorAll('.popup')); // массив со списком всех попапов на странице

// Кнопки на самой странице
const buttonEditProfile = document.querySelector(".profile__edit-button");  // кнопка правки профиля
const buttonOpenCardPopup = document.querySelector(".profile__add-button");  // кнопка добавления новой карточки

//==profilePopup
const buttonCloseProfile = profilePopup.querySelector(".popup__close-button");
const nameToBeDisplayed = profilePopup.querySelector(".popup__input-name");
const professionToBeDisplayed = profilePopup.querySelector(".popup__input-prof");
const newNameInput = profilePopup.querySelector(".popup__input-name");
const newProfessionInput = profilePopup.querySelector(".popup__input-prof");
const inputListProfile = Array.from(profileEditForm.querySelectorAll('.popup__input'));
const buttonElementProfile = profileEditForm.querySelector('.popup__submit-button');

//==cardPopup
const buttonCloseCardPopup = cardPopup.querySelector(".popup__close-button");
const newCardName = cardPopup.querySelector(".popup__input-name");
const newCardLink = cardPopup.querySelector(".popup__input-prof");
const buttonAddCard = cardPopup.querySelector('.popup__submit-button'); // кнопка - создать новую карточку

//==imagePopup
const buttonCloseImagePopup = imagePopup.querySelector(".popup__close-button");
const titleImagePopup = imagePopup.querySelector(".popup__image-title");
const fotoImagePopup = imagePopup.querySelector(".popup__image");

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector(".popup_opened");
      closePopup(currentPopup);
  };
}

function openPopup(elementToPopup) {
  elementToPopup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(elementToClose) {
  elementToClose.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByEsc);
}

function prepareProfilePopup() {
  nameToBeDisplayed.value = currentName.textContent;
  professionToBeDisplayed.value = currentProf.textContent;
}

function saveProfileChanges(evt) {
  evt.preventDefault();
  currentName.textContent = newNameInput.value;
  currentProf.textContent = newProfessionInput.value;
  closePopup(profilePopup);
}

function addNewCard (evt) {
  evt.preventDefault();
  const newCard = new Card({name: newCardName.value, link: newCardLink.value}, '#cardTemplate');
  const cardElement = newCard.createNewCard(); // вызываем функцию создания узла;
  cardElement.querySelector('.element__image').addEventListener('click', prepareImagePopup); //вешаем слушатель на фото для открытия во весь экран
  renderCard(cardElement);
  closePopup(cardPopup);
}

// функция отрисовки новой карточки на странице
function renderCard (elementToRender) {
  cardsContainer.prepend(elementToRender);
}

//Подготовка данных для imagePopup
function prepareImagePopup(evt) {
  const fotoLink = evt.target.src;
  const fotoTitle = evt.target.alt;
  titleImagePopup.textContent = fotoTitle;
  fotoImagePopup.src = fotoLink;
  openPopup(imagePopup);
}

// Добавляем первые 6 карточек
initialCards.forEach((item) => {
  const card = new Card(item, '#cardTemplate');
  const cardElement = card.createNewCard(); // вызываем функцию создания узла;
  cardElement.querySelector('.element__image').addEventListener('click', prepareImagePopup); //вешаем слушатель на фото для открытия во весь экран
  renderCard(cardElement);
});

// profilePopup - слушатели
buttonEditProfile.addEventListener('click', () => {
  hideAllInputErrorsOnOpen(profileEditForm, validationConfig); // вызываем функцию перебора и обнуления ошибок всех инпутов текущей формы
  prepareProfilePopup();
  enableSubmitButton(buttonElementProfile, validationConfig.inactiveButtonClass);
  openPopup(profilePopup);
});

buttonCloseProfile.addEventListener('click', () => {
  closePopup(profilePopup);
});

profileEditForm.addEventListener('submit', saveProfileChanges);

// imagePopup - слушатели
buttonCloseImagePopup.addEventListener('click', () => {
  closePopup(imagePopup);
});

// cardPopup - слушатели
buttonOpenCardPopup.addEventListener('click', () => {
  newCardForm.reset();  // очищаем поля ввода
  hideAllInputErrorsOnOpen(newCardForm, validationConfig); // вызываем функцию перебора и обнуления ошибок всех инпутов текущей формы
  disableSubmitButton(buttonAddCard, validationConfig.inactiveButtonClass);
  openPopup(cardPopup);
});

buttonCloseCardPopup.addEventListener('click', () => {
  closePopup(cardPopup);
});

newCardForm.addEventListener('submit', addNewCard);

popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
              closePopup(popup);
    }
  });
});

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((formElement) => {
  const form = new FormValidator(validationConfig, formElement);
  formElement.addEventListener('sumbit', (evt) => {
    evt.preventDefault();
  });
  form.enableValidation();
});
