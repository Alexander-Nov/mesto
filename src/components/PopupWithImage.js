import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._foto = this._popup.querySelector(".popup__image");
    this._fotoTitle = this._popup.querySelector(".popup__image-title");
  }

  open (fotoData) {
    this._fotoTitle.textContent = fotoData.name;
    this._foto.src = fotoData.link;
    this._foto.alt = fotoData.name;
    super.open();
  }
}
