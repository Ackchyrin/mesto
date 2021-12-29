import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupDeleteCard.js';
import{ popupOpenButtonElementProfile, formEdit, nameInput, aboutInput,  formImage, templateCard, buttonAddImage,  popupEditAvatar, formEditAvatar, config} from '../utils/constant.js'
import './index.css';

const api = new Api(
  'https://nomoreparties.co/v1/cohort-33',
  {authorization: '22fdfdf8-8495-4607-a646-eca1821ff286',
  'Content-Type': 'application/json'
});

Promise.all([api.aboutUser(), api.getInitialCards()])
  .then(([user, cards]) =>{
    userInfo.setUserInfo(user);
    userInfo.setAvatar(user.avatar);
    section.rendererItem(cards, user._id);
  })
  .catch(err => console.log(err));

  const popupWithImage = new PopupWithImage('.popup_open-image');

  const section = new Section({
    renderer: (input, userId) => section.addItem(createCard(input, userId))
}, '.elements');

const popupWithDelete = new PopupWithConfirmation('.popup_delete', deleteCardApi);
popupWithDelete.setEventListeners();

/*UserInfo отражает имя и дополнение о профиле */

const userInfo = new UserInfo('.profile__info-name', '.profile__info-about', '.profile__avatar');

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
  formValidatorEdit.activateButton();
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  aboutInput.value = getUserInfo.about;
}

popupOpenButtonElementProfile.addEventListener('click',openEditProfile);

const editProfileSubmit = new PopupWithForm(config, '.popup_edit-profile', {
  formSubmit: (input) => {
    editProfileSubmit.renderLoading(true);
    api.editProfile({
      name:  input.name,
      about: input.about
    })
    .then(result => {
    userInfo.setUserInfo(result)
    editProfileSubmit.close()
  })
    .catch(err => console.log(err))
    .finally(() =>{
    editProfileSubmit.renderLoading(false)
    })
  }
});

editProfileSubmit.setEventListeners();

/*Popup добавление фото-карточек */

function openPopupAddCard() {
  addCardSubmit.open();
  formValidatorCard.resetValidation();
}

buttonAddImage.addEventListener('click', openPopupAddCard);

const addCardSubmit = new PopupWithForm (config, '.popup_add-image', {
  formSubmit: (input) => {
    addCardSubmit.renderLoading(true);
    api.addNewCards({
      name: input.title,
      link: input.link
    })
    .then(result => {
    submitHandlerCard(result, userInfo.ID)
    addCardSubmit.close()
  })
    .catch(err => console.log(err))
    .finally(() =>{
    addCardSubmit.renderLoading(false)
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
    editAvatarSubmit.renderLoading(true);
    api.updateAvatar({
      link: input.avatar
    })
    .then(result => {
    submitHandlerAvatar(result)
    editAvatarSubmit.close()
  })
    .catch(err => console.log(err))
    .finally(() =>{
    editAvatarSubmit.renderLoading(false)
    })
  }
})

editAvatarSubmit.setEventListeners();

function submitHandlerAvatar(input) {
  userInfo.setAvatar(input.avatar);
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
      .then(result => {
      cleanup(result) 
      popupWithDelete.close()
    })
      .catch(err => console.log(err))
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
