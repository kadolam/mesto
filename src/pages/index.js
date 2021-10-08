import './index.css';

import {
  openEditButton,
  openAddButton,
  profileTitle,
  profileSubtitle,
  profileAvatar,
  formEditElement,
  formAddElement,
  inputName,
  inputJob,
  inputTitle,
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

//create card
function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupImage.open(item);
    },
    handleDelete: (item) => {
      console.log(item); //undefined
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
  }, '#element-card');
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
    cardElement.querySelector('.element__like-number').textContent = item.likes.length;
    cardsList.addItem(cardElement);
    },
  },
  elementContainer
);

//cardsList.renderItems();

api.getInitialCards()
  .then(res => {
    cardsList.renderItems(res);
  })
  .catch(err => {
    console.log(err);
  })

//add card
const addCard = new PopupWithForm({
  popup: '.popup_add',
  handleFormSubmit: (data) => {
    /*const newCardItem = {
      name: data.title,
      link: data.url
    };*/
    api.postCard(data.title, data.url)
      .then((res) => {
        const cardElement = createCard(res);
        cardsList.addItem(cardElement);
        addCard.close();
      })
      .catch(err => {
        console.log(err);
      });
  }
});

addCard.setEventListeners();

//popup profile
const editInfo = new UserInfo({
  userName: profileTitle,
  userJob: profileSubtitle
});

api.getUserInfo()
  .then(res => {
    profileTitle.textContent = res.name;
    profileSubtitle.textContent = res.about;
    profileAvatar.src = res.avatar;
  })
  .catch(err => {
    console.log(err);
  });

const editForm = new PopupWithForm({
  popup: '.popup_edit',
  handleFormSubmit: (data) => {
    console.log(data);
    api.patchUserInfo(data.name, data.job)
    .then((res) => {
      editInfo.setUserInfo(res);
      editForm.close();
    })
    .catch(err => {
      console.log(err);
    })
  }
});

editForm.setEventListeners();

