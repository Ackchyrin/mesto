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
  items: initialCards, renderer: createCard
},'.elements');

/*Валидация*/

const formValidatorEdit = new FormValidator(config, formEdit);
formValidatorEdit.enableValidation();

const formValidatorCard = new FormValidator(config, formImage);
formValidatorCard.enableValidation();

section.rendererItem();

/*секция */

function createCard(item) {
  const card = new Card(config, item, cardTemplate, popupWithImage.open);
  const cardElement = card.addCard();
  section.addItem(cardElement);
  return section;
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
    submitHandler(input);
  }
});

editProfileSubmit.setEventListeners();

function submitHandler(input) {
  userInfo.setUserInfo(input.name_popup, input.about_popup);
}

/*Popup добавление фото-карточек */

function openPopupAddCard() {
  addCardSubmit.open();
  formValidatorCard.resetValidation();
}

buttonAddImage.addEventListener('click', openPopupAddCard);

const addCardSubmit = new PopupWithForm(config, '.popup_add-image', {
  formSubmit: (input) => {
    createCard({ title: input.title_popup, link: input.link_popup });
  }
});

addCardSubmit.setEventListeners();
