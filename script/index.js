/* закрытие и открытие popup */
const popup = [...document.querySelectorAll('.popup')];
const popupElementProfile = document.querySelector('.popup_edit-profile');
const popupCloseButton = popupElementProfile.querySelector('.popup__close');
const popupOpenButtonElementProfile = document.querySelector('.profile__info-button');
const profileName = document.querySelector('.profile__info-name');
const profileEmployment = document.querySelector('.profile__info-about');
const nameInput = popupElementProfile.querySelector('.popup__input_name');
const employmentInput = popupElementProfile.querySelector('.popup__input_about');
const buttonSavePopupChangesProfile = popupElementProfile.querySelector('.popup__save');

/* Фуркция открытие и закрытия popup */

function popupOpen(popup){
  popup.classList.add('popup_open');
}
  
function popupClose(popup) {
  popup.classList.remove('popup_open');
};
  
function closePopupByClickOverlay (event) {
  popup.forEach((popup) => {
  if (event.target == popup) {
  popupClose(popup);
  }
});
}
popupElementProfile.addEventListener('click', closePopupByClickOverlay);

/* Popup профиля сохранения */

function valuePopupProfile() {
  nameInput.value = profileName.textContent;
  employmentInput.value = profileEmployment.textContent;

  popupOpen (popupElementProfile);
};

popupOpenButtonElementProfile.addEventListener('click', valuePopupProfile);


function saveProfileInformation(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileEmployment.textContent = employmentInput.value;

  popupClose(popupElementProfile);
};

popupCloseButton.addEventListener('click', saveProfileInformation);
buttonSavePopupChangesProfile.addEventListener('click', saveProfileInformation);

/* Popup добавление фото-карточки */

const popupAddImage = document.querySelector('.popup_add-image');
const buttonAddImage = document.querySelector('.profile__button');
const popupSaveButtonAddImage = document.querySelector('.popup__save-add');

buttonAddImage.addEventListener('click', popupOpen);

function popupOpenAddImage() {
  popupOpen(popupAddImage);
};

buttonAddImage.addEventListener('click', popupOpenAddImage);

function popupCloseAddImage() {
  popupClose(popupAddImage);
}
popupSaveButtonAddImage.addEventListener('click', popupCloseAddImage);
popupAddImage.addEventListener('click', closePopupByClickOverlay);

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
  popupClose(popupAddImage);
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
    openImage(item.link, item.title);
});
  return element;
  }

/* открытие фото-карточки */   

const popupOpenImageFull = document.querySelector ('.popup_open-image');
const popupOpenImage = document.querySelector ('.open-image');
const viewImage = document.querySelector ('.open-image__picture');
const viewCaption = document.querySelector ('.open-image__caption');
const popupCloseButtonImageView = document.querySelector ('.popup__close-button_open-image');

const closePopupOpenImage = function () {
  popupClose(popupOpenImageFull);
};

popupOpenImageFull.addEventListener('click', closePopupOpenImage);

function openImage(link, title) {
  popupOpen(popupOpenImageFull);
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
