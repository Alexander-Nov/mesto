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
const newAvatarForm = document.querySelector(".popup__form_type_new-avatar"); // форма замены аватара, для отслеживания Submit
// Кнопки на странице
const buttonEditProfile = document.querySelector(".profile__edit-button");  // кнопка правки профиля
const buttonOpenCardPopup = document.querySelector(".profile__add-button");  // кнопка добавления новой карточки
const buttonOpenAvatarPopup = document.querySelector(".profile__avatar");  // кнопка avatar
const nameToBeDisplayed = profilePopup.querySelector(".popup__input-name");
const professionToBeDisplayed = profilePopup.querySelector(".popup__input-prof");
let myId = '';


const user = new UserInfo ({
  nameSelector: ".profile__name",
  profSelector: ".profile__description",
  avatarSelector: ".profile__avatar"
});

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-42/cards",
  headers: {
    authorization: "59f5e864-0688-4993-901f-7b637899b27f",
        "content-type": "application/json"
  }
});

api.getUserData()
.then((result) => {
  user.setUserInfo(result);
  user.replaceAvatar(result);
  myId = result._id;
})
.catch((err) => {
  console.log(err);
});

api.getInitialCards()
.then((initialCardsList) => {
  cardsList.renderingItems = initialCardsList;
})
.then(() => {
  cardsList.renderItems();
})
.catch((err) => {
  console.log(err);
});

function cardLikeFunction(cardId, element, card) {
  if (!element.querySelector(".element__heart").classList.contains("element__heart_active")) {
    api.addLike(cardId)
    .then((data) => {
      card.addLike(data.likes);
    })
  } else {
    api.deleteLike(cardId)
    .then((data) => {
      card.removeLike(data.likes);
    })
  }
}

function cardDeleteFunction (cardId, element, card) {
  popupItemDeleteSubmition.open(cardId, element, card);
}

const popupItemEditProfile = new PopupWithForm (".popup_type_profile", {
  formSubmitter: (profileData) => {
    popupItemEditProfile.renderLoading(true);
    api.replaceUSerData(profileData)
    .then((data) => {
      user.setUserInfo(data);
      popupItemEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupItemEditProfile.renderLoading(false);
    })
  }
});

const popupItemReplaceAvatar = new PopupWithForm (".popup_type_new-avatar", {
  formSubmitter: (data) => {
    popupItemReplaceAvatar.renderLoading(true);
    api.updateAvatar({avatar: data["avatar-input-link"]})
    .then((data) => {
      user.replaceAvatar(data);
      popupItemReplaceAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupItemReplaceAvatar.renderLoading(false);
    })
  }
});

const popupItemAddNewCard = new PopupWithForm (".popup_type_card", {
  formSubmitter: (cardData, element) => {
    popupItemAddNewCard.renderLoading(true);
    api.postNewCard({name: cardData["addCard-input-name"], link: cardData["addCard-input-link"]})
    .then((data) => {
      const cardElement = prepareNewCard(
        {
          name: cardData["addCard-input-name"],
          link: cardData["addCard-input-link"],
          _id: data._id,
          likes: [],
          owner: {_id: myId}
        },
        myId,
        '#cardTemplate',
        popupItemImage.open.bind(popupItemImage),
        cardDeleteFunction,
        cardLikeFunction
        );
      cardsList.addItem(cardElement, true);
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
formSubmitter: (cardId, elementId, card) => {
  popupItemDeleteSubmition.renderLoading(true);
  api.deleteCard(cardId, card)
  .then(() => {
    card.deleteCardFromDOM();
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

function prepareNewCard (card, userId, templateSelector, imagePopupFunction, cardDeleteFunction, cardLikeFunction) {
  const newCard = new Card(card, userId, templateSelector, imagePopupFunction, cardDeleteFunction, cardLikeFunction);
  const cardElement = newCard.createNewCard(); // вызываем функцию создания узла;
  return cardElement;
}

const cardsList = new Section({
  items: '',
  renderer: (cardItem) => {
    const cardElement = prepareNewCard(
      cardItem,
      myId,
      '#cardTemplate',
      popupItemImage.open.bind(popupItemImage),
      cardDeleteFunction,
      cardLikeFunction
      );
    cardsList.addItem(cardElement, false);
  },
},
'.elements'
);

popupItemEditProfile.setEventListeners();
popupItemAddNewCard.setEventListeners();
popupItemImage.setEventListeners();
popupItemReplaceAvatar.setEventListeners();

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

// слушатель на нажатие на Аватаре
  buttonOpenAvatarPopup.addEventListener('click', () => {
  formNewAvatarValidtor.hideAllInputErrorsOnOpen();
  formNewAvatarValidtor.disableSubmitButton();
  popupItemReplaceAvatar.open();
});

const formProfileValidator = new FormValidator(profileEditForm, validationConfig);
formProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(newCardForm, validationConfig);
formAddCardValidator.enableValidation();

const formNewAvatarValidtor = new FormValidator(newAvatarForm, validationConfig);
formNewAvatarValidtor.enableValidation();
