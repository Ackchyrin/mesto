const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible'
};

enableValidation(config);

/* Запуск валидации получается */

function  enableValidation(validationConfig) {
    const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
    forms.forEach((form) => addFormListener(form, validationConfig));
}

/* Работа валидации */

function addFormListener(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);
    form.addEventListener('submit', resetSubmit);
    form.addEventListener('input', () => SubmitButtonState(form, config, button));
    inputs.forEach((inputElement) =>{
        inputElement.addEventListener('input', ()=> handleFieldValidation(inputElement, form, config))
    });
    SubmitButtonState(form, config, button);
}

/* Функция проверки input */

function handleFieldValidation(input, form, config) {
    if (!input.validity.valid) {
        showError(input, form, config);
    } else {
        hideError(input, form, config);
    }
}

/* Функции вывода ошибки */

function showError(input, form, config) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
}

function hideError(input, form, config) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = ' ';
}

function hideErrors(parent) {
    const inputs = parent.querySelectorAll('form__input');
    const form = parent.querySelector('form');
    inputs.forEach(input => {
        hideError(input, form, config);
    });
}

/*Работа кнопки submit */

function SubmitButtonState(form, config, button){
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity())
}

/* Обнуление стандартных значений */

function resetSubmit(event) {
    event.preventDefault();
}
