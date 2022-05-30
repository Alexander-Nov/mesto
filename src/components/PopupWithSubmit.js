import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {

  constructor(popupSelector, { formSubmitter }) {
    super(popupSelector);
    this._formSubmitter = formSubmitter;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  renderLoading(isLoading) {
    if (isLoading) {
      // console.log('заменили надпись на Удаление .....');
      this._form.querySelector('.popup__submit-button').textContent = "Удаление...";
      } else {
        // console.log('заменили надпись на Да');
        this._form.querySelector('.popup__submit-button').textContent = "Да";
      }
  }

  open (cardId, element) {
    this._currentCardId = cardId;
    this._currentElement = element;
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // console.log(evt.target);
      this._formSubmitter(this._currentCardId, this._currentElement);
    })
  }

}
