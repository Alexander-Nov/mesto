export class Card {

  constructor(card, templateSelector, handleCardClick, handleDeleteClick) {
    this._cardName = card.name;
    this._cardLink = card.link;
    this._id = card._id;
    this.likes = card.likes;
    this._ownerId = card.owner._id;
    this._userId = 'f1e0b482b9b7811852c249f7';


    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._element = this._getTemplate(); // скопировали шаблон = получили элемент карточки
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setLike() {
    this._elementHeart.classList.toggle("element__heart_active");
  }

  _deleteCardFromDOM() {
    this._element.remove();
    this._cardElement = null;
    // console.log(this._id);
    // this._handleDeleteClick(this._id);
  }

  _setEventListeners() {
    this._elementHeart = this._element.querySelector('.element__heart');
    this._elementHeart.addEventListener('click', () => { //слушатель на кнопку Like
      this._setLike();
    });
    this._element.querySelector(".element__delete").addEventListener('click', () => { //слушатель на кнопку delete
      this._handleDeleteClick(this._id, this._element);
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
    this._element.querySelector(".element__delete").classList.add(this._userId === this._ownerId ? 'element__delete_visible' : 'element__delete_hidden');
    // console.log(this._element.querySelector(".element__delete"));
    this._setEventListeners();
    return this._element;
  }

}
