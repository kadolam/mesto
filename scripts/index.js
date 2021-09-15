import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

export const popup = document.querySelector('.popup');
const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');
export const imgPopup = document.querySelector('.popup_img');
export const srcImgPopup= imgPopup.querySelector('.popup__img');
export const figcaptionImgPopup= imgPopup.querySelector('.popup__figcaption');
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

const editFormValidator = new FormValidator(formEditElement, settings);
const addFormValidator = new FormValidator(formAddElement, settings);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//open popup
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escape);
}
openEditButton.addEventListener('click', () => {
  openPopup(editPopup);
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
});
openAddButton.addEventListener('click', () => {
  openPopup(addPopup);
  const saveAddPopupButton = addPopup.querySelector('.popup__save-btn');
  addFormValidator.resetValidation();
});

//close popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escape);
}
closeEditPopupButton.addEventListener('click', () => {
  closePopup(editPopup);
});
closeAddPopupButton.addEventListener('click', () => {
  closePopup(addPopup);
});
closeImgPopupButton.addEventListener('click', () => {
  closePopup(imgPopup);
});

//overlay close
document.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
});

//escape close
function escape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function createCard(data) {
  const card = new Card(data, '#element-card');
  return card.generateCard();
}

function renderCard(data) {
  const cardElement = createCard(data);
  elementContainer.prepend(cardElement);
}

initialCards.forEach((data) => {
  renderCard(data);
});

//add card
function addCard (evt) {
  evt.preventDefault();
  renderCard({name: inputTitle.value, link: inputUrl.value});
  formAddElement.reset();
  closePopup(addPopup);
}

formAddElement.addEventListener('submit', addCard);

//submit form
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closePopup(editPopup);
}

formEditElement.addEventListener('submit', formSubmitHandler);


