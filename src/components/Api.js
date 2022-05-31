export default class Api {
  constructor(user) {
    this._user = user;
  }

  postNewCard(newCardData) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-42/cards", {
      method: "POST",
      headers: {
        authorization: "59f5e864-0688-4993-901f-7b637899b27f",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-42/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "59f5e864-0688-4993-901f-7b637899b27f",
          "content-type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserData() {
    return fetch("https://nomoreparties.co/v1/cohort-42/users/me", {
      headers: {
        authorization: "59f5e864-0688-4993-901f-7b637899b27f",
      },
    })
    .then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });

  }

  getInitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-42/cards", {
      headers: {
        authorization: "59f5e864-0688-4993-901f-7b637899b27f",
      },
    })
      .then((res) => {
        if (res.ok) {
          return Promise.resolve(res.json());
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  replaceUSerData(newData) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-42/users/me", {
      method: "PATCH",
      headers: {
        authorization: "59f5e864-0688-4993-901f-7b637899b27f",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newData["input-name"],
        about: newData["input-prof"],
      }),
    }).then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addLike(cardId) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-42/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: "59f5e864-0688-4993-901f-7b637899b27f",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteLike(cardId) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-42/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: "59f5e864-0688-4993-901f-7b637899b27f",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateAvatar(newData) {
    return fetch(
      "https://mesto.nomoreparties.co/v1/cohort-42/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: "59f5e864-0688-4993-901f-7b637899b27f",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    ).then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
