import { initialCards, validationConfig } from '../utils/initial.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
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
const myId = 'f1e0b482b9b7811852c249f7';

const user = new UserInfo ({nameSelector: ".profile__name", profSelector: ".profile__description"});

const apiElement = new Api(user);
apiElement.getUserData();
// .then((id) => {
//   myId = id;
//   console.log(myId);
// });



const popupItemEditProfile = new PopupWithForm (".popup_type_profile", {
  formSubmitter: (profileData) => {
    popupItemEditProfile.renderLoading(true);
    apiElement.replaceUSerData(profileData)
    .then((data) => {
      user.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupItemEditProfile.renderLoading(false);
    })
    popupItemEditProfile.close();
  }
});

const popupItemAddNewCard = new PopupWithForm (".popup_type_card", {
  formSubmitter: (cardData, element) => {
    popupItemAddNewCard.renderLoading(true);
    apiElement.postNewCard({name: cardData["addCard-input-name"], link: cardData["addCard-input-link"]})
    .then((data) => {
      const cardElement = prepareNewCard(
        {
          name: cardData["addCard-input-name"],
          link: cardData["addCard-input-link"],
          _id: data._id,
          likes: [],
          owner: {_id: myId}
        },
        '#cardTemplate',
        popupItemImage.open.bind(popupItemImage),
        (cardId) => {popupItemDeleteSubmition.open(cardId, cardElement)});
      cardsList.addItem(cardElement);
      popupItemAddNewCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupItemAddNewCard.renderLoading(false);
    })
  }
});

const popupItemDeleteSubmition = new PopupWithSubmit (".popup_type_confirm", {
formSubmitter: (cardId, elementId) => {
  // console.log('зашли в форму подтверждения удаления карточки');
  popupItemDeleteSubmition.renderLoading(true);
  apiElement.deleteCard(cardId)
  .then(() => {
    // console.log('Получили разрешение на удаление карточки');
    // console.log(data);
    // console.log(cardId);
    // console.log(elementId);

    elementId.remove();
    // this._cardElement = null;
    popupItemDeleteSubmition.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupItemDeleteSubmition.renderLoading(false);
  })
}
});

popupItemDeleteSubmition.setEventListeners();


const popupItemImage = new PopupWithImage (".popup_type_image");

function prepareProfilePopup() {
  const userData = user.getUserInfo();
  nameToBeDisplayed.value = userData.name;
  professionToBeDisplayed.value = userData.prof;
}

function prepareNewCard (card, templateSelector, imagePopupFunction, cardDeleteFunction) {
  const newCard = new Card(card, templateSelector, imagePopupFunction, cardDeleteFunction);
  const cardElement = newCard.createNewCard(); // вызываем функцию создания узла;
  return cardElement;
}

const cardsList = new Section({
  items: '',
  renderer: (cardItem) => {
    // console.log(cardItem);
    // const cardElement = prepareNewCard(cardItem, '#cardTemplate', popupItemImage.open.bind(popupItemImage), (cardItem) => {popupItemDeleteSubmition.open(cardItem._id)});
    const cardElement = prepareNewCard(cardItem, '#cardTemplate', popupItemImage.open.bind(popupItemImage), (cardId, element) => {popupItemDeleteSubmition.open(cardId, element)});
    cardsList.addItem(cardElement);
  },
},
'.elements'
);

// console.log(cardsList);

apiElement.getInitialCards()
.then((initialCardsList) => {
  cardsList.renderingItems = initialCardsList;
  // console.log(initialCardsList);
})
.then(() => {
  cardsList.renderItems();
})


// cardsList.renderItems();

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

// console.log(cardsList);
