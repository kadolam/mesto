export default class UserInfo {
  constructor({ userName, userJob }) {
    this._name = userName;
    this._job = userJob;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}
