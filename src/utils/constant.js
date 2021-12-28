export const popupOpenButtonElementProfile = document.querySelector('.profile__info-button');
export const formEdit = document.forms.formprofile;
export const nameInput = formEdit.elements.name;
export const aboutInput = formEdit.elements.about;
export const elements = document.querySelector ('.elements');
export const formImage = document.forms.popupimage;
export const templateCard = document.querySelector('#card-template').content;
export const buttonAddImage = document.querySelector('.profile__button');
export const profileName = document.querySelector('profile__info-name'); 
export const profileAbout = document.querySelector('profile__info-about');
export const popupEditAvatar = document.querySelector('.profile__edit-avatar');
export const formEditAvatar = document.forms.popupavatar;

/*Карточки по умолчанию */

export const initialCards = [
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

/* конфиг */

export const config = {
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
