import Popup from './Popup.js';

class PopupWithForm extends Popup{
    constructor(config, popupSelector, {formSubmit}, retreiveData = null){
        super(popupSelector),
        this._config = config,
        this._formSubmit = formSubmit,
        this._form = this._popup.querySelector(this._config.formSelector),
        this._inputList = [...this._form.querySelectorAll(this._config.inputSelector)],
        this._submitForm = this._submitForm.bind(this),
        this._submitButton = this._popup.querySelector('.popup__save');
        this._handleRetreive = retreiveData
    }

    open = () =>{
        this._resetSave();
        super.open();
    }

    close(){
        super.close();
        this._form.reset();
    }

    _setSave() {
        this._submitButton.textContent = this._config.preservation;
        this._submitButton.textContent = this._config.preservation;
        this._submitButton.textContent = this._config.creation;
    }

    _resetSave() {
        this._submitButton.textContent = this._config.save;
        this._submitButton.textContent = this._config.save;
        this._submitButton.textContent = this._config.create;
    }

    _getInputValues() {
        const dataInputsValue = {};
        this._inputList.forEach((input) => {
            dataInputsValue[input.name] = input.value;
        });
        return dataInputsValue;
    }

    _submitForm(event) {
        event.preventDefault();
        this._setSave();
        this._formSubmit(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => this._submitForm(event));
    }
}

export default PopupWithForm;
