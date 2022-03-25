const popupElement = document.querySelector(".edit-section");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = popupElement.querySelector(".edit-form__closebtn");
const saveButton = popupElement.querySelector(".edit-form__submitbtn");

const profileInfo = document.querySelector(".profile__info");
const currentName = profileInfo.querySelector(".profile__name");
const currentProf = profileInfo.querySelector(".profile__description");
const editSection = document.querySelector(".edit-form");
const popupFotoFrame = document.querySelector(".popupFoto");

function openEditSection() {
  const nameToBeDisplayed = editSection.querySelector(".edit-form__input-name");
  const professionToBeDisplayed = editSection.querySelector(
    ".edit-form__input-prof"
  );
  nameToBeDisplayed.value = currentName.textContent;
  professionToBeDisplayed.value = currentProf.textContent;
  popupElement.classList.add("edit-section__opened");
}

function closeEditSection() {
  popupElement.classList.remove("edit-section__opened");
}

function saveChanges(evt) {
  evt.preventDefault();
  const newName = editSection.querySelector(".edit-form__input-name");
  const newProfession = editSection.querySelector(".edit-form__input-prof");
  currentName.textContent = newName.value;
  currentProf.textContent = newProfession.value;
  closeEditSection();
}

editButton.addEventListener('click', openEditSection);

closeButton.addEventListener('click', closeEditSection);

editSection.addEventListener('submit', saveChanges);


// Форма добавления новой карточки
const addCardElement = document.querySelector(".addCard-section");
const addCardButton = document.querySelector(".profile__add-button");
const addCardCloseButton = addCardElement.querySelector(".addCard-form__closebtn");
const addCardSaveButton = addCardElement.querySelector(".addCard-form__submitbtn");
const cardTemplate = document.querySelector('#cardTemplate').content;
const elements = document.querySelector('.elements');
const addCardSection = document.querySelector(".addCard-form");


const initialCards = [
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


function addCard (card) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  foto = cardElement.querySelector('.element__image');
  foto.src = card.link;
  foto.alt = card.name;
  cardElement.querySelector('.element__title').textContent = card.name;
  elements.prepend(cardElement);

  //выбираем кнопку Like и вешаем на нее слушатель
  const cardLike = cardElement.querySelector('.element__heart');
  cardLike.addEventListener('click', setLike);

  //выбираем кнопку Закрыть и вешаем на нее слушатель
  const deleteCardButton = document.querySelector(".element__delete");
  deleteCardButton.addEventListener('click', deleteCard);

  //вешаем слушатель на всю поверхность фото для открытия во весь экран
  foto.addEventListener('click', openPopupFoto)
}

// Добавляем первые 6 карточек
for (let c = 0; c < 6; c = c + 1) {
  addCard(initialCards[c]);
}

function createNewCard (evt) {
  evt.preventDefault();

  // считываем показания из инпутов и формируем объект newCard
  const newCardName = addCardSection.querySelector(".addCard-form__input-name");
  const newCardLink = addCardSection.querySelector(".addCard-form__input-link");
  const newCard = [];
  newCard.name = newCardName.value;
  newCard.link = newCardLink.value;

  // вызываем функцию addCard(newCard);
  addCard(newCard);

  //очищаем поля ввода
  newCardName.value = '';
  newCardLink.value = '';

  // закрываем секцию
  closeAddCardSection()
}

function openAddCardSection () {
  addCardElement.classList.add("addCard-section__opened");
}

function closeAddCardSection() {
  addCardElement.classList.remove("addCard-section__opened");
}

addCardButton.addEventListener('click', openAddCardSection);
addCardCloseButton.addEventListener('click', closeAddCardSection);
addCardSection.addEventListener('submit', createNewCard);

// функция like на карточках
function setLike (evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle("element__heart_active");
}

//Удаление карточки
function deleteCard (evt) {
  const cardToBeDeleted = evt.target.closest('.element');
  cardToBeDeleted.remove();
}

//Попап фотографии
const fotoCloseButton = popupFotoFrame.querySelector(".popupFoto__closebtn");

function openPopupFoto(evt) {
  const fotoLink = evt.target.src;
  const fotoTitle = evt.target.nextElementSibling.textContent;
  popupFotoFrame.querySelector(".popupFoto__title").textContent = fotoTitle;
  const popupFotoFrameImage = popupFotoFrame.querySelector(".popupFoto__image");
  popupFotoFrameImage.src = fotoLink;
  popupFotoFrame.classList.add("popupFoto__opened");
}

function closePopupFoto() {
  popupFotoFrame.classList.remove("popupFoto__opened");
}

fotoCloseButton.addEventListener('click', closePopupFoto);
