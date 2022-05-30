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
    })
      .then((res) => {
        if (res.ok) {
          // console.log('получили ОК поновой карте');
          return Promise.resolve(res.json());
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-42/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "59f5e864-0688-4993-901f-7b637899b27f",
        "content-type": "application/json",
      }
    })
    .then((res) => {
      if (res.ok) {
        // console.log('получили ОК по удалению карты');
        return Promise.resolve(res.json());
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserData() {
    fetch("https://nomoreparties.co/v1/cohort-42/users/me", {
      headers: {
        authorization: "59f5e864-0688-4993-901f-7b637899b27f",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        document.querySelector(".profile__name").textContent = result.name;
        document.querySelector(".profile__description").textContent =
          result.about;
        document.querySelector(".profile__avatar").src = result.avatar;
        // return Promise.resolve(result._id);
        // myId = result._id;
        // console.log(result._id);
      })
      // .then((result) => {return Promise.resolve(result._id);})
      .catch((err) => {
        console.log(err);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllDataToRender() {}

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
}
