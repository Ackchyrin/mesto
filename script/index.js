/* закрытие и открытие popup */
const popupElementProfile = document.querySelector('.popup');
const popupCloseButtonElement = popupElementProfile.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__info-button');
const profileName = document.querySelector('.profile__info-name');
const profileEmployment = document.querySelector('.profile__info-about');
const nameInput = popupElementProfile.querySelector('.popup__input_name');
const employmentInput = popupElementProfile.querySelector('.popup__input_about');
const buttonSavePopupChanges = popupElementProfile.querySelector('.popup__save')

function valuePopup () {
  nameInput.value = profileName.textContent;
  employmentInput.value = profileEmployment.textContent;

  popupElementProfile.classList.add('popup_open');
};

popupOpenButtonElement.addEventListener('click',valuePopup);

const closePopup = function () {
  popupElementProfile.classList.remove('popup_open');
};

popupCloseButtonElement.addEventListener('click', closePopup);

const closePopupByClickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }

  closePopup();
};

popupElementProfile.addEventListener('click', closePopupByClickOverlay);

/* Сохранение изменений в профиле */

buttonSavePopupChanges.addEventListener('click',saveNewInformation);

function saveNewInformation (event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileEmployment.textContent = employmentInput.value;

  closePopup();
};
