import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(popupSelector, { formSubmitter }) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._formSubmitter = formSubmitter;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');

  }

  showInfo (evt) {
    console.log(this._formSubmitter);
    console.log(evt);
  }

  _getInputValues () {
    const data = {};
    this._inputs.forEach((input) => {
      data[input.name] = input.value
    });
    return data;
  }

  close () {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
    this._form.reset();
  }

  setEventListeners () {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('submit', (evt) => {
      this._formSubmitter(evt);
    })

    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
    });
  }
}
