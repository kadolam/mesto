const popup = document.querySelector('.popup');
const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');
const imgPopup = document.querySelector('.popup_img');
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

//open popup
function openEditPopup() {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
  editPopup.classList.add('popup_opened');
}
openEditButton.addEventListener('click', openEditPopup);

function openAddPopup() {
  addPopup.classList.add('popup_opened');
}
openAddButton.addEventListener('click', openAddPopup);

//close popup
function closeEditPopup() {
  editPopup.classList.remove('popup_opened');
}
closeEditPopupButton.addEventListener('click', closeEditPopup);

function closeAddPopup() {
  addPopup.classList.remove('popup_opened');
}
closeAddPopupButton.addEventListener('click', closeAddPopup);

function closeImgPopup() {
  imgPopup.classList.remove('popup_opened');
}
closeImgPopupButton.addEventListener('click', closeImgPopup);

//cards array
function renderCard(name, link) {
  const cardTemplate = document.querySelector('#element-card').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__img').src = link;
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like_active');
});
  cardElement.querySelector('.element__delete-btn').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  cardElement.querySelector('.element__img').addEventListener('click', function() {
    imgPopup.classList.add('popup_opened');
    srcImgPopup.src = link;
    figcaptionImgPopup.textContent = name;
  });
  
elementContainer.prepend(cardElement);
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});

//add card
function addCard (evt) {
  evt.preventDefault();
  renderCard(inputTitle.value, inputUrl.value);
  inputTitle.value = '';
  inputUrl.value = '';
  closeAddPopup();
}

formAddElement.addEventListener('submit', addCard);

//submit form
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputJob.value;
  closeEditPopup();
}

formEditElement.addEventListener('submit', formSubmitHandler);

