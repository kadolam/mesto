export class Card {
  constructor( { data, handleCardClick, handleDelete, handleLikeClick }, cardSelector, userId) {
      this._data = data;
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._ownerId = data.owner._id;
      this._userId = userId;
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
    this._image = this._element.querySelector('.element__img');
    this._like = this._element.querySelector('.element__like');
    this._likeCounter = this._element.querySelector('.element__like-number');
    this._deleteButton = this._element.querySelector('.element__delete-btn');

    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._likeCounter.textContent = this._likes.length;

    if (this._userId !== this._ownerId) {
      this._deleteButton.hidden = true;
    };

    this._liked = this._likes.some((item) => {
      return item._id === this._userId
    });
    
    if (this._liked) {
      this._like.classList.add('element__like_active');
    } else {
      this._like.classList.remove('element__like_active');
    }

    return this._element;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDelete();
    });
  }

  handleDeleteClick() {
    this._element.remove();
  }

  setLikesInfo(likes) {
    this._likesInfo = likes;
    this._likeCounter.textContent = this._likesInfo.likes.length;
  }

  isLiked() {
    if (this._likes.find((item) => {
      return item._id === this._userId
    })
    );
  }
}

