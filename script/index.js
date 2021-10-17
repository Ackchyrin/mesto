/* закрытие и открытие popup */
const popupElementProfile = document.querySelector('.popup');
const popupCloseButtonElement = popupElementProfile.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__info-button');

const openPopup = function () {
  popupElementProfile.classList.add('popup__open');
};

const closePopup = function () {
  popupElementProfile.classList.remove('popup__open');
};

popupCloseButtonElement.addEventListener('click', closePopup);

const closePopupByClickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  closePopup();
};

popupElementProfile.addEventListener('click', closePopupByClickOverlay);

/* Изменение данных профиля в popup */

const profileName = document.querySelector('.profile__info-name');
const profileEmployment = document.querySelector('.profile__info-about');
const nameInput = popupElementProfile.querySelector('.popup__name');
const employmentInput = popupElementProfile.querySelector('.popup__about');

function popupValue () {
  nameInput.value = profileName.textContent;
  employmentInput.value = profileEmployment.textContent;

  openPopup();
};

popupOpenButtonElement.addEventListener('click', popupValue);

/* Сохранение изменений в профиле */

const buttonSavePopupChanges = popupElementProfile.querySelector('.popup__save')

const savePopupChanges = function() {
  popupElementProfile.classList.remove('popup__open');
};

buttonSavePopupChanges.addEventListener('click',saveNewInformation);

function saveNewInformation (event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileEmployment.textContent = employmentInput.value;

  savePopupChanges();
};
