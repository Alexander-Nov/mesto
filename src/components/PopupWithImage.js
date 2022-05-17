import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._foto = this._popup.querySelector(".popup__image");
    this._fotoTitle = this._popup.querySelector(".popup__image-title");
  }

  open (evt) {
    this._fotoLink = evt.target.src;
    this._fotoName = evt.target.alt;

    this._fotoTitle.textContent = this._fotoName;
    this._foto.src = this._fotoLink;
    this._foto.alt = this._fotoName;
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  }

}
