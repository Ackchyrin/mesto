import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import{initialCards, popupOpenButtonElementProfile, formEdit, nameInput, aboutInput,  formImage, cardTemplate, buttonAddImage} from '../utils/constant.js'
import './index.css';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
};

const popupWithImage = new PopupWithImage('.popup_open-image');

const section = new Section({
  items: initialCards, renderer: (input) => section.addItem(createCard(input.title, input.link))
},'.elements');

/*Валидация*/

const formValidatorEdit = new FormValidator(config, formEdit);
formValidatorEdit.enableValidation();

const formValidatorCard = new FormValidator(config, formImage);
formValidatorCard.enableValidation();

section.rendererItem();

function createCard(title, link) {
  const card = new Card({ title, link }, cardTemplate, popupWithImage.open);
  const cardElement = card.addCard();
  return cardElement;
}

popupWithImage.setEventListeners();

/*UserInfo отражает имя и дополнение о профиле */

const userInfo = new UserInfo('.profile__info-name', '.profile__info-about');

/* Открытие попапов профиля */
function openEditProfile(){
  editProfileSubmit.open();
  formValidatorEdit.resetValidation();
  formValidatorEdit.addSubmitButton();
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  aboutInput.value = getUserInfo.about;
}

popupOpenButtonElementProfile.addEventListener('click',openEditProfile);

const editProfileSubmit = new PopupWithForm(config, '.popup_edit-profile', {
  formSubmit: (input) => {
    submitHandlerProfile(input);
    editProfileSubmit.close()
  }
});

editProfileSubmit.setEventListeners();

function submitHandlerProfile(input) {
  userInfo.setUserInfo(input.namepopup, input.aboutpopup);
}

/*Popup добавление фото-карточек */

function openPopupAddCard() {
  addCardSubmit.open();
  formValidatorCard.resetValidation();
}

buttonAddImage.addEventListener('click', openPopupAddCard);

const addCardSubmit = new PopupWithForm(config, '.popup_add-image', {
  formSubmit: (input) => {
    submitHandlerCard(input);
    addCardSubmit.close()
  }
});

addCardSubmit.setEventListeners();

function submitHandlerCard(input) {
  section.addItem(createCard(input.titlepopup, input.linkpopup));
}
