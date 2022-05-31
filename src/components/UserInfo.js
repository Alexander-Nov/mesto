export default class UserInfo {

  constructor({nameSelector, profSelector, avatarSelector}) {
    this._currentName = document.querySelector(nameSelector);
    this._currentProf = document.querySelector(profSelector);
    this._currentAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo () {
    this.currentData = {name: this._currentName.textContent, prof: this._currentProf.textContent};
    return this.currentData;
  }

  setUserInfo (newData) {
    this._currentName.textContent = newData.name;
    this._currentProf.textContent = newData.about;
  }

  replaceAvatar(newData) {
    this._currentAvatar.src = newData.avatar;
  }
}
