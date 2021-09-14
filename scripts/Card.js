import {
  openPopup,
  imgPopup,
  srcImgPopup,
  figcaptionImgPopup
} from './index.js';

export class Card {
  constructor(data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
  }

  _getTemplate() {
    console.log(this._cardSelector);
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

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeIcon();
    });

    this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _handleLikeIcon() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleDeleteClick() {
    this._element.querySelector('.element__delete-btn').closest('.element').remove();
  }

  _handleCardClick() {
    openPopup(imgPopup);
    srcImgPopup.src = this._link;
    srcImgPopup.alt = this._name;
    figcaptionImgPopup.textContent = this._name;
  }

}
