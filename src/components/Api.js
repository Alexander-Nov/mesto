export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

  postNewCard(newCardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(cardId, card) {
    return fetch(
      `${this._baseUrl}/cards/${cardId}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then((res) => {
      return this._getResponseData(res, card);
    });
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then((res) => {
      return this._getResponseData(res);
    });

  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      });
  }

  replaceUSerData(newData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newData["input-name"],
        about: newData["input-prof"],
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  addLike(cardId) {
    return fetch(
      `${this._baseUrl}/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: this._headers,
      }
    ).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteLike(cardId) {
    return fetch(
      `${this._baseUrl}/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then((res) => {
      return this._getResponseData(res);
    });
  }

  updateAvatar(newData) {
    return fetch(
      `${this._baseUrl}/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(newData),
      }
    ).then((res) => {
      return this._getResponseData(res);
    });
  }
}
