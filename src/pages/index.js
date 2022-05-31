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

const apiElement = new Api(user);

apiElement.getUserData()
.then((result) => {
  document.querySelector(".profile__name").textContent = result.name;
  document.querySelector(".profile__description").textContent = result.about;
  buttonOpenAvatarPopup.src = result.avatar;
  myId = result._id;
})
.catch((err) => {
  console.log(err);
});

apiElement.getInitialCards()
.then((initialCardsList) => {
  cardsList.renderingItems = initialCardsList;
})
.then(() => {
  cardsList.renderItems();
})
.catch((err) => {
  console.log(err);
});

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

const popupItemReplaceAvatar = new PopupWithForm (".popup_type_new-avatar", {
  formSubmitter: (data) => {
    popupItemReplaceAvatar.renderLoading(true);
    apiElement.updateAvatar({avatar: data["avatar-input-link"]})
    .then((data) => {
      user.replaceAvatar(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupItemReplaceAvatar.renderLoading(false);
    })
    popupItemReplaceAvatar.close();
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
        (cardId) => {popupItemDeleteSubmition.open(cardId, cardElement)},
        (cardId, element) => {
          if (!element.querySelector(".element__heart").classList.contains("element__heart_active")) {
          apiElement.addLike(cardId)
          .then((data) => {
            element.querySelector(".element__heart").classList.add("element__heart_active");
            element.querySelector('.element__like-counter').textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err);
          })
        } else {
          console.log("удаляем лайк");
          apiElement.deleteLike(cardId)
          .then((data) => {
            element.querySelector(".element__heart").classList.remove("element__heart_active");
            element.querySelector('.element__like-counter').textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err);
          })
        }
        }
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
formSubmitter: (cardId, elementId) => {
  popupItemDeleteSubmition.renderLoading(true);
  apiElement.deleteCard(cardId)
  .then(() => {
    elementId.remove();
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

function prepareNewCard (card, templateSelector, imagePopupFunction, cardDeleteFunction, cardLikeFunction) {
  const newCard = new Card(card, templateSelector, imagePopupFunction, cardDeleteFunction, cardLikeFunction);
  const cardElement = newCard.createNewCard(); // вызываем функцию создания узла;
  return cardElement;
}

const cardsList = new Section({
  items: '',
  renderer: (cardItem) => {
    const cardElement = prepareNewCard(
      cardItem,
      '#cardTemplate',
      popupItemImage.open.bind(popupItemImage),
      (cardId, element) => {popupItemDeleteSubmition.open(cardId, element)},
      (cardId, element) => {
        if (!element.querySelector(".element__heart").classList.contains("element__heart_active")) {
        apiElement.addLike(cardId)
        .then((data) => {
          element.querySelector(".element__heart").classList.add("element__heart_active");
          element.querySelector('.element__like-counter').textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        console.log("удаляем лайк");
        apiElement.deleteLike(cardId)
        .then((data) => {
          element.querySelector(".element__heart").classList.remove("element__heart_active");
          element.querySelector('.element__like-counter').textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
      }
      }
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
