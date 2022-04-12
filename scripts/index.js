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

// Переменные на странице
const profilePopup = document.querySelector(".popup_type_profile");  // Попап редактирования профиля
const profileEditForm = document.querySelector(".popup__form_type_profile");  // форма редактирования профиля
const cardPopup = document.querySelector(".popup_type_card");   // Попап добавления новой карточки
const newCardForm = document.querySelector(".popup__form_type_card"); // форма добавления новой карты, для отслеживания Submit
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

//==imagePopup
const buttonCloseImagePopup = imagePopup.querySelector(".popup__close-button");
const titleImagePopup = imagePopup.querySelector(".popup__image-title");
const fotoImagePopup = imagePopup.querySelector(".popup__image");

function onDocumentKeyDown (evt) {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector(".popup_opened");
    closePopup(currentPopup);
    };
}

function openPopup(elementToPopup) {
  elementToPopup.classList.add("popup_opened");
  document.addEventListener('keydown', onDocumentKeyDown);
}

function closePopup(elementToClose) {
  elementToClose.classList.remove("popup_opened");
  document.removeEventListener('keydown', onDocumentKeyDown);
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

function createNewCard (card) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true); //клонируем разметку из шаблона
  const foto = cardElement.querySelector('.element__image');
  foto.src = card.link;
  foto.alt = card.name;
  cardElement.querySelector('.element__title').textContent = card.name;
  const cardLike = cardElement.querySelector('.element__heart'); //выбираем кнопку Like и вешаем на нее слушатель
  cardLike.addEventListener('click', setLike);
  const deleteCardButton = cardElement.querySelector(".element__delete"); //выбираем кнопку delete и вешаем на нее слушатель
  deleteCardButton.addEventListener('click', deleteCard);
  foto.addEventListener('click', prepareImagePopup); //вешаем слушатель на фото для открытия во весь экран
  return cardElement;
}

function addNewCard (evt) {
  evt.preventDefault();
  const newCard = {name: newCardName.value, link: newCardLink.value};
  const cardElement = createNewCard(newCard); // вызываем функцию создания узла;
  renderCard(cardElement); // вызываем функцию добавления узла на страницу
  newCardName.value = ''; // очищаем поля ввода
  newCardLink.value = '';
  closePopup(cardPopup); // закрываем cardPopup
}

// функция отрисовки новой карточки на странице
function renderCard (elementToRender) {
  cardsContainer.prepend(elementToRender);
}

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
  const cardElement = createNewCard(item); // вызываем функцию создания узла;
  renderCard(cardElement);
});

// profilePopup - слушатели
buttonEditProfile.addEventListener('click', () => {
  prepareProfilePopup();
  toggleButtonState(inputListProfile, buttonElementProfile);
  openPopup(profilePopup);
});

buttonCloseProfile.addEventListener('click', () => {
  const errorNameElement = profileEditForm.querySelector('#input-name-error');
  errorNameElement.textContent = '';
  const errorProfElement = profileEditForm.querySelector('#input-prof-error');
  errorProfElement.textContent = '';
  closePopup(profilePopup);
});

profileEditForm.addEventListener('submit', saveProfileChanges);

// imagePopup - слушатели
buttonCloseImagePopup.addEventListener('click', () => {
  closePopup(imagePopup);
});

// cardPopup - слушатели
buttonOpenCardPopup.addEventListener('click', () => {
  openPopup(cardPopup);
});

buttonCloseCardPopup.addEventListener('click', () => {
  const errorNameElement = newCardForm.querySelector('#card-name-error');
  errorNameElement.textContent = '';
  const errorProfElement = newCardForm.querySelector('#card-link-error');
  errorProfElement.textContent = '';
  newCardName.value = ''; // очищаем поля ввода
  newCardLink.value = '';
  closePopup(cardPopup);
});

newCardForm.addEventListener('submit', addNewCard);

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
  });
});
