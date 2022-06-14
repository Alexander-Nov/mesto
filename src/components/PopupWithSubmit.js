import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, { formSubmitter }) {
    super(popupSelector);
    this._formSubmitter = formSubmitter;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__submit-button");
    this._initialButtonText = this._submitButton.textContent;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Удаление...";
    } else {
      this._submitButton.textContent = this._initialButtonText;
    }
  }

  open(cardId, element, card) {
    this._currentCardId = cardId;
    this._currentElement = element;
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitter(this._currentCardId, this._currentElement, this._card);
    });
  }
}
