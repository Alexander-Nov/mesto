export class Card {

  constructor(card, templateSelector, imagePopupFunction) {
    this._cardName = card.name;
    this._cardLink = card.link;
    this._templateSelector = templateSelector;
    this._imagePopupFunction = imagePopupFunction;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setLike() {
    this._element.querySelector('.element__heart').classList.toggle("element__heart_active");
  }

  _deleteCard() {
    this._element.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', () => { //слушатель на кнопку Like
      this._setLike();
    });
    this._element.querySelector(".element__delete").addEventListener('click', () => { //слушатель на кнопку delete
      this._deleteCard();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => { //слушатель на клик по фото
      this._imagePopupFunction();
    });
  }

  createNewCard() {
    this._element = this._getTemplate(); // скопировали шаблон = получили элемент карточки
    const foto = this._element.querySelector('.element__image');
    foto.src = this._cardLink; // наполняем данными
    foto.alt = this._cardName;
    this._element.querySelector('.element__title').textContent = this._cardName;
    this._setEventListeners();
    return this._element;
  }

}
