export class Card {
  constructor( { data, handleCardClick, handleDelete }, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleDelete = handleDelete;
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

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeIcon();
    });

    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleCardClick();
    });

    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._handleDelete();
    });
  }

  _handleLikeIcon() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  handleDeleteClick() {
    this._element.querySelector('.element__delete-btn').closest('.element').remove();
  }
}

