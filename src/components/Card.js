export class Card {

  constructor(card, templateSelector, handleCardClick) {
    this._cardName = card.name;
    this._cardLink = card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate(); // скопировали шаблон = получили элемент карточки
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setLike() {
    this._elementHeart.classList.toggle("element__heart_active");
  }

  _deleteCard() {
    this._element.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._elementHeart = this._element.querySelector('.element__heart');
    this._elementHeart.addEventListener('click', () => { //слушатель на кнопку Like
      this._setLike();
    });
    this._element.querySelector(".element__delete").addEventListener('click', () => { //слушатель на кнопку delete
      this._deleteCard();
    });

    this._foto.addEventListener('click', (evt) => { //слушатель на клик по фото
      this._handleCardClick({name: this._cardName, link: this._cardLink});
    });
  }

  createNewCard() {
    this._foto = this._element.querySelector('.element__image');
    this._foto.src = this._cardLink; // наполняем данными
    this._foto.alt = this._cardName;
    this._element.querySelector('.element__title').textContent = this._cardName;
    this._setEventListeners();
    return this._element;
  }

}
