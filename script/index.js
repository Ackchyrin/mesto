import FormValidator from './FormValidator.js';
import Card from './Card.js';
const popups = Array.from(document.querySelectorAll('.popup'));
const popupElementProfile = document.querySelector('.popup_edit-profile');
const popupCloseButton = popupElementProfile.querySelector('.popup__close');
const popupOpenButtonElementProfile = document.querySelector('.profile__info-button');
const profileName = document.querySelector('.profile__info-name');
const profileEmployment = document.querySelector('.profile__info-about');
const nameInput = popupElementProfile.querySelector('.popup__input_name');
const employmentInput = popupElementProfile.querySelector('.popup__input_about');
const buttonSavePopupChangesProfile = popupElementProfile.querySelector('.popup__save');
const formEdit = document.forms.formprofile;
const elements = document.querySelector ('.elements');
const formImage = document.forms.popupimage;
const inputTitle = formImage.elements.title;
const inputLink = formImage.elements.link;
const viewImagePicture = document.querySelector('.open-image__picture');
const viewCaption = document.querySelector('.open-image__caption');
const cardTemplate = document.querySelector('#card-template').content;
const popupAddImage = document.querySelector('.popup_add-image');
const buttonAddImage = document.querySelector('.profile__button');
const popupCloseButtonAddImage = document.querySelector('.popup__close-add');
const popupOpenImageFull = document.querySelector ('.popup_open-image');

/* Фукнция открытие и закрытия popup */

function popupOpen(popup){
  popup.classList.add('popup_open');
  window.addEventListener('keydown', closeEscPopup);
}
  
function popupClose(popup) {
  popup.classList.remove('popup_open');
  window.removeEventListener('keydown', closeEscPopup);
};
  
function closePopupByClickOverlay (event) {
  popups.forEach((popup) => {
    if (event.target == popup) {
      popupClose(popup);
    }
  });
}

popupElementProfile.addEventListener('click', closePopupByClickOverlay);

function closeEscPopup(event) {
  if (event.key == 'Escape') {
      popups.filter((popup) => popup.classList.contains('popup_open')).forEach(popup => {
        popupClose(popup);
      });
  };
}

/* Popup профиля сохранения */

function setProfileInputs() {
  nameInput.value = profileName.textContent;
  employmentInput.value = profileEmployment.textContent;
  formValidatorEdit.resetValidation(popupElementProfile);
};

function popupOpenProfileEdit(){
setProfileInputs();
popupOpen (popupElementProfile);
buttonSavePopupChangesProfile.removeAttribute('disabled', false);
}

popupOpenButtonElementProfile.addEventListener('click', popupOpenProfileEdit);


function saveProfileInformation(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileEmployment.textContent = employmentInput.value;

  popupClose(popupElementProfile);
};

formEdit.addEventListener('submit', saveProfileInformation);

function popupProfileClose(){
  popupClose(popupElementProfile);
}

popupCloseButton.addEventListener('click', popupProfileClose);

/* Popup добавление фото-карточки */

function popupOpenAddImage() {
  popupOpen(popupAddImage);
  formValidatorCard.resetValidation(popupAddImage);
};

buttonAddImage.addEventListener('click', popupOpenAddImage);

function popupCloseAddImage() {
  popupClose(popupAddImage);
}
popupCloseButtonAddImage.addEventListener('click', popupCloseAddImage);
popupAddImage.addEventListener('click', closePopupByClickOverlay);

/* Функиця добавление карточки*/

function addCardSubmit(event) {
  event.preventDefault();
  const link = inputLink.value;
  const title = inputTitle.value;
  const card = { title, link };
  const newCard = createCard(card);
  prependCard(newCard);
  popupClose(popupAddImage);
  event.target.reset();
}

formImage.addEventListener('submit', addCardSubmit);

function prependCard(card) {
  elements.prepend(card);
}

function createCard(item) {
  const card = new Card (config, item, cardTemplate, popupOpen, popupClose);
  const cardElement = card.addCard();
  console.log(cardElement);
  return cardElement;
}

/* закрытие фото-карточки */   

const closePopupOpenImage = function () {
  popupClose(popupOpenImageFull);
};

popupOpenImageFull.addEventListener('click', closePopupOpenImage);

/* карточки по умолчанию */

const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/*Валидация*/

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
  viewImagePicture,
  viewCaption,
  popupOpenImageFull,
};

function appendCard(card) {
  elements.append(card);
}

initialCards.forEach((item) => {
  const card = createCard(item);
  appendCard(card);
});

const formValidatorEdit = new FormValidator (config, formEdit);
formValidatorEdit.enableValidation ();

const formValidatorCard = new FormValidator(config, formImage);
formValidatorCard.enableValidation();
