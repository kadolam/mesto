export const popup = document.querySelector('.popup');
export const editPopup = document.querySelector('.popup_edit');
export const addPopup = document.querySelector('.popup_add');
export const imgPopup = document.querySelector('.popup_image');
export const srcImgPopup= imgPopup.querySelector('.popup__img');
export const figcaptionImgPopup= imgPopup.querySelector('.popup__figcaption');
export const closeEditPopupButton = editPopup.querySelector('.popup__close-btn');
export const closeAddPopupButton = addPopup.querySelector('.popup__close-btn');
export const closeImgPopupButton = imgPopup.querySelector('.popup__close-btn');
export const openEditButton = document.querySelector('.profile__edit-button');
export const openAddButton = document.querySelector('.profile__add-button');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const formEditElement = editPopup.querySelector('.popup__form');
export const formAddElement = addPopup.querySelector('.popup__form');
export const inputName = editPopup.querySelector('.popup__input_text_name');
export const inputJob = editPopup.querySelector('.popup__input_text_job');
export const inputTitle = addPopup.querySelector('.popup__input_text_title');
export const inputUrl = addPopup.querySelector('.popup__input_text_url');
export const elementContainer = document.querySelector('.elements');
export const elementTitle = document.querySelector('.element__title');

export const initialCards = [
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

export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
