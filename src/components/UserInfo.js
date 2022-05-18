export default class UserInfo {

  constructor({nameSelector, profSelector}) {
    this._currentName = document.querySelector(nameSelector);
    this._currentProf = document.querySelector(profSelector);
  }

  getUserInfo () {
    this.currentData = {name: this._currentName.textContent, prof: this._currentProf.textContent};
    return this.currentData;
  }

  setUserInfo (newData) {
    this._currentName.textContent = newData["input-name"];
    this._currentProf.textContent = newData["input-prof"];
  }
}
