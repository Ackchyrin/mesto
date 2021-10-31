/* закрытие и открытие popup */
const popupElementProfile = document.querySelector('.popup_edit-profile');
const popupCloseButtonElement = popupElementProfile.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__info-button');
const profileName = document.querySelector('.profile__info-name');
const profileEmployment = document.querySelector('.profile__info-about');
const nameInput = popupElementProfile.querySelector('.popup__input_name');
const employmentInput = popupElementProfile.querySelector('.popup__input_about');
const buttonSavePopupChanges = popupElementProfile.querySelector('.popup__save');

/* Popup профиля открытие и сохранения */

function valuePopupProfile() {
  nameInput.value = profileName.textContent;
  employmentInput.value = profileEmployment.textContent;

  popupElementProfile.classList.add('popup_open');
};

popupOpenButtonElement.addEventListener('click', valuePopupProfile);

const closePopupProfile = function () {
  popupElementProfile.classList.remove('popup_open');
};

popupCloseButtonElement.addEventListener('click', closePopupProfile);

const closePopupByClickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  closePopupProfile();
};

popupElementProfile.addEventListener('click', closePopupByClickOverlay);

buttonSavePopupChanges.addEventListener('click', saveNewInformation);

function saveNewInformation(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileEmployment.textContent = employmentInput.value;

  closePopupProfile();
};

/* Popup добавление фото-карточки */

const popupAddImage = document.querySelector('.popup_add-image');
const buttonAddImage = document.querySelector('.profile__button');
const popupCloseButtonImage = document.querySelector('.popup__close-add');

function popupImage() {
  popupAddImage.classList.add('popup_open');
};

buttonAddImage.addEventListener('click', popupImage);

const closePopupImage = function () {
  popupAddImage.classList.remove('popup_open');
};

popupCloseButtonImage.addEventListener('click', closePopupImage);

const closePopupImageByClickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  closePopupImage();
};

popupAddImage.addEventListener('click', closePopupImageByClickOverlay);

/* Добавление карточек, удаление, лайк, открытие карточек */

const popupCreateCard = document.querySelector ('.popup_creat-card');
const formImage = document.forms.popupimage ;
const inputTitle = formImage.elements.title;
const inputLink = formImage.elements.link;
const elements = document.querySelector ('.elements');
const cardTemplate = document.querySelector('#card-template').content;



function createElementSubmit(event) {
  event.preventDefault();
  const title = inputTitle.value;
  const link = inputLink.value;
  const item = { title, link };
  appendCard(item);
  closePopupImage(popupImage);
  event.target.reset();
}

function appendCard(item) {
  const element = createCard(item);
  elements.prepend(element);
}

popupAddImage.addEventListener('submit',createElementSubmit);

function createCard(item){
  const element = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = element.querySelector('.element__image');
  cardImage.src = item.link;
  cardImage.alt = item.title;
  element.querySelector('.element__description').textContent = item.title;
  element.querySelector('.element__delete').addEventListener('click', function() {
    element.remove();
  });
  element.querySelector('.element__like').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like_pressed');
  });
  cardImage.addEventListener('click', function(event) {
    event.preventDefault();
    OpenImage(item.link, item.title);
});
  return element;
  }

/* открытие фото-карточки */   

const popupOpenImageFull = document.querySelector ('.popup_open-image');
const popupOpenImage = document.querySelector ('.open-image');
const viewImage = document.querySelector ('.open-image__picture');
const viewCaption = document.querySelector ('.open-image__caption');
const popupCloseButtonImageView = document.querySelector ('.popup__close-button_open-image');

function popupOpenImageScreen() {
  popupOpenImageFull.classList.add('open-image');
};

popupOpenImageFull.addEventListener('click', popupOpenImageScreen);

const closePopupOpenImage = function () {
  popupOpenImageFull.classList.remove('open-image');
};

popupOpenImageFull.addEventListener('click', closePopupOpenImage);

function OpenImage(link, title) {
  popupOpenImageScreen(popupOpenImageFull);
  viewImage.src = link;
  viewImage.alt = title;
  viewCaption.textContent = title;
}

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

initialCards.forEach(appendCard);
