import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(popupSelector, { formSubmitter }) {
    super(popupSelector);
    this._formSubmitter = formSubmitter;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  renderLoading(isLoading) {
    if (isLoading) {
      console.log('заменили надпись на Сохранение .....');
      this._form.querySelector('.popup__submit-button').textContent = "Сохранение...";
      } else {
        console.log('заменили надпись на Сохранить');
        this._form.querySelector('.popup__submit-button').textContent = "Сохранить";
      }
  }

  _getInputValues () {
    const data = {};
    this._inputs.forEach((input) => {
      data[input.name] = input.value
    });
    return data;
  }

  close () {
    super.close();
    this._form.reset();
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitter(this._getInputValues());
    })
  }
}
