import './index.css';

import {
  openEditButton,
  openAddButton,
  profileTitle,
  profileSubtitle,
  formEditElement,
  formAddElement,
  inputName,
  inputJob,
  inputTitle,
  inputUrl,
  elementContainer,
  initialCards,
  settings
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
    }
  }, '#element-card');
  return card.generateCard();
}

//popup image
const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

//initial cards
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
    },
  },
  elementContainer
);

cardsList.renderItems();

//add card
const addCard = new PopupWithForm({
  popup: '.popup_add',
  handleFormSubmit: (data) => {
    const newCardItem = {
      name: data.title,
      link: data.url
    };
    const cardElement = createCard(newCardItem);
		cardsList.addItem(cardElement);
    addCard.close();
  }
});

    /*const newCardItem = {
      name: item.title,
      link: inputUrl.value
    };*/

addCard.setEventListeners();

//popup profile
const editInfo = new UserInfo({
  userName: profileTitle,
  userJob: profileSubtitle
});

const editForm = new PopupWithForm({
  popup: '.popup_edit',
  handleFormSubmit: (data) => {
    editInfo.setUserInfo(data);
    editForm.close();
  }
});

editForm.setEventListeners();

