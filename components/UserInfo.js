export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._name = userNameSelector;
    this._job = userJobSelector;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  setUserInfo(data) {
    document.querySelector('.profile__title').textContent = data.name;
    document.querySelector('.profile__subtitle').textContent = data.job;
  }
}
