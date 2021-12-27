import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import AvatarEdit from '../components/AvatarEdit.js';
import PopupWithConfirmation from '../components/PopupDeleteCard.js';
import{ popupOpenButtonElementProfile, formEdit, nameInput, aboutInput,  formImage, templateCard, buttonAddImage,  popupEditAvatar, formEditAvatar} from '../utils/constant.js'
import './index.css';


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
  save: 'Сохранить',
  create: 'Создать',
  preservation: 'Сохранение',
  creation: 'Создание',
};

const api = new Api({
  address: 'https://nomoreparties.co/v1/cohort-33',
  token: '22fdfdf8-8495-4607-a646-eca1821ff286'
});

Promise.all([api.aboutUser(), api.getInitialCards()])
  .then(([user, cards]) =>{
    userInfo.setUserInfo(user);
    avatarEdit.setAvatar(user.avatar);
    section.rendererItem(cards, user._id);
  })

  const popupWithImage = new PopupWithImage('.popup_open-image');

  const section = new Section({
    renderer: (input, userId) => section.addItem(createCard(input, userId))
}, '.elements');

const popupWithDelete = new PopupWithConfirmation('.popup_delete', deleteCardApi);
popupWithDelete.setEventListeners();

  /*UserInfo отражает имя и дополнение о профиле */

const userInfo = new UserInfo('.profile__info-name', '.profile__info-about');
const avatarEdit = new AvatarEdit('.profile__avatar');

/*Валидация*/

const formValidatorEdit = new FormValidator(config, formEdit);
formValidatorEdit.enableValidation();

const formValidatorCard = new FormValidator(config, formImage);
formValidatorCard.enableValidation();

const formValidatorEditAvatar = new FormValidator(config, formEditAvatar);
formValidatorEditAvatar.enableValidation();

popupWithImage.setEventListeners();

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
    api.editProfile({
      name: userInfo.getUserInfo().name,
      about:userInfo.getUserInfo().about
    })
    .then(result => userInfo.setUserInfo(result))
    .catch(err => console.log(err))
    .finally(() =>{
      editProfileSubmit.close();
    })
  }
});

editProfileSubmit.setEventListeners();

function submitHandlerProfile(input) {
  const data = {name: input.namepopup, about: input.aboutpopup};
  userInfo.setUserInfo(data);
}

/*Popup добавление фото-карточек */

function openPopupAddCard() {
  addCardSubmit.open();
  /* formValidatorCard.resetValidation(); */
}

buttonAddImage.addEventListener('click', openPopupAddCard);

const addCardSubmit = new PopupWithForm (config, '.popup_add-image', {
  formSubmit: (input) => {
    api.addNewCards({
      name: input.title,
      link: input.link
    })
    .then(result => submitHandlerCard(result, userInfo.ID))
    .catch(err => console.log(err))
    .finally(() =>{
      addCardSubmit.close()
    })
  }
});

addCardSubmit.setEventListeners();

function submitHandlerCard(data, userID) {
  section.addItem(createCard(data, userID));
} 

function createCard(card, userID) {
  const cardCreate = new Card(config, card, templateCard, popupWithImage.open, userID, { openPopupDelete }, handleLikeClick);
  const cardElement = cardCreate.addCard();
  return cardElement;
}

/* попап изменение аватара */

const editAvatarSubmit = new PopupWithForm (config, '.popup_avatar', {
  formSubmit: (input) => {
    api.updateAvatar({
      link: input.avatar
    })
    .then(result => submitHandlerAvatar(result))
    .catch(err => console.log(err))
    .finally(() =>{
      editAvatarSubmit.close()
    })
  }
})

editAvatarSubmit.setEventListeners();

function submitHandlerAvatar(input) {
  avatarEdit.setAvatar(input.avatar);
}

function openPopupEditAvatar() {
  editAvatarSubmit.open();
  formValidatorEditAvatar.resetValidation();
}

popupEditAvatar.addEventListener('click', openPopupEditAvatar);

/* попап удаление карточки */

function deleteCardApi(data) {
  const { id, cleanup } = data;
  api.deleteCard(id)
      .then(() => cleanup())
      .catch(err => console.log(err))
      .finally(() => {
          popupWithDelete.close()
      })
}

function openPopupDelete(data) {
  popupWithDelete.open(data);
}

function handleLikeClick(card) {
  if (card.isLiked()) {
      api.removeLike(card._item._id)
          .then((result) => card.setLikes(result.likes))
          .catch(err => console.log(err))
  } else {
      api.addlike(card._item._id)
          .then((result) => card.setLikes(result.likes))
          .catch(err => console.log(err))
  }
}
