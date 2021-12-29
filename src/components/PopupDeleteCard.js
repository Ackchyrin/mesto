import Popup from "./Popup";

class PopupDeleteCard extends Popup {
    constructor(popupSelector, handleConfirm) {
        super(popupSelector),
        this._form = document.forms.popupdelete,
        this._handleConfirm = handleConfirm,
        this._submitButton = this._popup.querySelector('.popup__save'),
        this._data = null
    }

    _handleSubmit = (evt) => {
        evt.preventDefault();
        this._setSave();
        this._handleConfirm(this._data);
    }

    _setSave() {
        this._submitButton.textContent = 'Удаление...';
    }

    _resetSave() {
        this._submitButton.textContent = 'Да';
    }

    open(data) {
        this._data = data;
        this._resetSave();
        super.open();
    }

    close() {
        this._data = null;
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmit);
    }
}

export default PopupDeleteCard;