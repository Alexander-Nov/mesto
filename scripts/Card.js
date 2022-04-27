export class Card {

  constructor(card, templateSelector) {
    this._cardName = card.name;
    this._cardLink = card.link;
    this._templateSelector = templateSelector;
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
  }

  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', () => { //слушатель на кнопку Like
      this._setLike();
    });
    this._element.querySelector(".element__delete").addEventListener('click', () => { //слушатель на кнопку delete
      this._deleteCard();
    });
  }

  createNewCard() {
    this._element = this._getTemplate(); // скопировали шаблон = получили элемент карточки

    this._element.querySelector('.element__image').src = this._cardLink; // наполняем данными
    this._element.querySelector('.element__image').alt = this._cardName;
    this._element.querySelector('.element__title').textContent = this._cardName;

    this._setEventListeners();

    return this._element;
  }

}
