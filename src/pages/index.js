import './index.css';

import {
  openEditButton,
  openAddButton,
  openAvatar,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  formEditElement,
  formAddElement,
  inputName,
  inputJob,
  formAvatarElement,
  inputUrl,
  elementContainer,
  initialCards,
  settings,
  elementTitle,
  elementImage
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import { Promise } from 'core-js';

// api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
  headers: {
    authorization: '3a0473e8-303f-44df-9511-413c24aa2304',
    'Content-Type': 'application/json'
  }
});
//validation
const editFormValidator = new FormValidator(formEditElement, settings);
const addFormValidator = new FormValidator(formAddElement, settings);
const avatarFormValidator = new FormValidator(formAvatarElement, settings);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//open popup
openEditButton.addEventListener('click', () => {
  popupEditProfile.open();
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputJob.value = userData.job;
});

openAddButton.addEventListener('click', () => {
  popupAddCard.open();
  addFormValidator.resetValidation();
});

openAvatar.addEventListener('click', () => {
  avatarForm.open();
  addFormValidator.resetValidation();
});

//create card
function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupImage.open(item);
    },
    handleLikeClick: () => {
      api.likeStatus(item._id, !card.isLiked())
        .then(data => {
          card.setLikesInfo(data);
        })
        .catch(err => {
          console.log(err);
        })
    },
    handleDelete: () => {
      popupDelete.open();
      popupDelete.setSubmit(() => {
        api.removeCard(item._id)
          .then(() => {
            card.handleDeleteClick();
            popupDelete.close();
          })
          .catch(err => {
            console.log(err);
          })
      });
    }
  }, '#element-card', userId);
  return card.generateCard();
}

//popup image
const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

//popup delete
const popupDelete = new PopupWithDelete('.popup_delete');
popupDelete.setEventListeners();

//initial cards
const cardsList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
    },
  },
  elementContainer
);

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(values => {
    values[0].reverse();
    userInfo.setUserInfo(values[1]);
    cardsList.renderItems(values[0]);
  })
  .catch(err => {
    console.log(err);
  });

let userId = null;

const userIdInfo = api.getUserId()
  .then(res => {
    userId = res._id;
  })
  .catch(err => {
    console.log(err);
  });

//add card
const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_add',
  handleFormSubmit: (data) => {
    popupAddCard.renderLoading(true, 'Создание...');
    api.postCard(data.title, data.url)
      .then((res) => {
        const cardElement = createCard(res);
        cardsList.addItem(cardElement);
        popupAddCard.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.renderLoading(false);
      });
  }
});

popupAddCard.setEventListeners();

//popup profile
const userInfo = new UserInfo({
  userName: profileTitle,
  userJob: profileSubtitle,
  userAvatar: profileAvatar
});

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_edit',
  handleFormSubmit: (data) => {
    popupEditProfile.renderLoading(true, 'Сохранение...');
    api.patchUserInfo(data.name, data.job)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false);
      })
  }
});

popupEditProfile.setEventListeners();

const avatarForm = new PopupWithForm({
  popupSelector: '.popup_avatar',
  handleFormSubmit: (data) => {
    avatarForm.renderLoading(true, 'Сохранение...');
    api.patchAvatar(data.avatar)
      .then((res) => {
        userInfo.setUserInfo(res);
        avatarForm.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        avatarForm.renderLoading(false);
      })
  }
});

avatarForm.setEventListeners();

