let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-btn');
let openEditButton = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');
let inputName = document.querySelector('.popup__input_name');
let inputJob = document.querySelector('.popup__input_job');

//open popup
function openPopup() {
    popup.classList.add('popup_opened');
    inputName.value = profileTitle.textContent;
    inputJob.value = profileSubtitle.textContent;
}

openEditButton.addEventListener('click', openPopup);

//close popup
function closePopup() {
    popup.classList.remove('popup_opened');
}

closePopupButton.addEventListener('click', closePopup);

//submit form
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputJob.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);