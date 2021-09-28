import './index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popup = document.querySelector('.popup');
const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');
const imgPopup = document.querySelector('.popup_image');
const srcImgPopup= imgPopup.querySelector('.popup__img');
const figcaptionImgPopup= imgPopup.querySelector('.popup__figcaption');
const closeEditPopupButton = editPopup.querySelector('.popup__close-btn');
const closeAddPopupButton = addPopup.querySelector('.popup__close-btn');
const closeImgPopupButton = imgPopup.querySelector('.popup__close-btn');
const openEditButton = document.querySelector('.profile__edit-button');
const openAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formEditElement = editPopup.querySelector('.popup__form');
const formAddElement = addPopup.querySelector('.popup__form');
const inputName = editPopup.querySelector('.popup__input_text_name');
const inputJob = editPopup.querySelector('.popup__input_text_job');
const inputTitle = addPopup.querySelector('.popup__input_text_title');
const inputUrl = addPopup.querySelector('.popup__input_text_url');
const elementContainer = document.querySelector('.elements');
const elementTitle = document.querySelector('.element__title');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//validation
const editFormValidator = new FormValidator(formEditElement, settings);
const addFormValidator = new FormValidator(formAddElement, settings);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

//open popup
openEditButton.addEventListener('click', () => {
  editForm.open();
  const userData = editInfo.getUserInfo();
  inputName.value = userData.name;
  inputJob.value = userData.job;
});

openAddButton.addEventListener('click', () => {
  addCard.open();
  addFormValidator.resetValidation();
});
/*
//overlay close
document.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
});
*/
//initial cards
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        const popupImage = new PopupWithImage(item, imgPopup);
        popupImage.open(item);
        popupImage.setEventListeners();
      }
    }, '#element-card');
    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
    },
  },
  elementContainer
);

cardsList.renderItems();

//popup profile
const editInfo = new UserInfo({
  userNameSelector: profileTitle,
  userJobSelector: profileSubtitle
});

const editForm = new PopupWithForm({
  popupSelector: editPopup,
  handleFormSubmit: (data) => {
    editInfo.setUserInfo(data);
    editForm.close();
  }
});

editForm.setEventListeners();

//add card
const addCard = new PopupWithForm({
  popupSelector: addPopup,
  handleFormSubmit: () => {
    const newCardItem = {
      name: inputTitle.value,
      link: inputUrl.value
    }
    const newCard = new Card({
      data: newCardItem,
      handleCardClick: (item) => {
        const popupImage = new PopupWithImage(newCardItem, imgPopup);
        popupImage.open(item);
        popupImage.setEventListeners();
      }
    }, '#element-card');
    const cardElement = newCard.generateCard();
		elementContainer.prepend(cardElement);
    addCard.close();
  }
});

addCard.setEventListeners();
