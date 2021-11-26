class FormValidator {
    constructor (config, formName){
        this._config = config;
        this._formName = formName;
        this._inputList = [...formName.querySelectorAll(config.inputSelector)];
        this._submitButton = formName.querySelector(config.submitButtonSelector);
    }

/* Запуск валидации получается */

enableValidation() {
    this._setFormListener();
}

/* Работа валидации */

_setFormListener() {
    this._formName.addEventListener('submit', (evt) => this._resetSubmit(evt));
    this._formName.addEventListener('input', () => this.SubmitButtonState());
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => this._handleFieldValidation(inputElement));
    });
    this.SubmitButtonState();
}

/* Функция проверки input */

_handleFieldValidation(input) {
    if (!input.validity.valid) {
        this._showInputError(input);
    } else {
        this._hideInputError(input);
    }
}

/* Функции вывода ошибки */

_showInputError(input) {
    const errorElement = this._formName.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
}

_hideInputError(input) {
    const errorElement = this._formName.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
}

/*Работа кнопки submit */

SubmitButtonState(){
    this._submitButton.disabled = !this._formName.checkValidity();
    this._submitButton.classList.toggle(this._config.inactiveButtonClass, !this._formName.checkValidity());
}

/* Обнуление стандартных значений */

_resetSubmit(evt) {
    evt.preventDefault();
}

}

export default FormValidator ;
