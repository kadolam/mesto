export class Card {
  constructor( { data, handleCardClick, handleDelete, handleLikeClick }, cardSelector) {
      this._data = data;
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._userId = 'c0627b1f572800be1c8aca4f';
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleDelete = handleDelete;
      this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;
    this._element.querySelector('.element__like-number').textContent = this._likes.length;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleCardClick();
    });

    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._handleDelete();
    });
  }

  handleDeleteClick() {
    this._element.remove();
  }

  setLikesInfo(likes) {
    this._likesInfo = likes;
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
    this._element.querySelector('.element__like-number').textContent = this._likesInfo.likes.length;
  }

  isLiked() {
    if(this._likes.find((item) => {
      return item._id === this._userId
    }));
  }
}

