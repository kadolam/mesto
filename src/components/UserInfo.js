export default class UserInfo {
  constructor({ userName, userJob, userAvatar }) {
    this._name = userName;
    this._job = userJob;
    this._avatar = userAvatar;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
