class Card {
    constructor(config, item, template, popupOpen, popupClose) {
        this._item = item,
        this._config = config,
        this._view = template.querySelector('.element').cloneNode(true),
        this._cardImage = this._view.querySelector('.element__image'),
        this._popupOpen = popupOpen,
        this._popupClose = popupClose
    }

    addCard() {
        this._cardImage.src = this._item.link;
        this._cardImage.alt = this._item.title;
        this._view.querySelector('.element__description').textContent = this._item.title;
        this._setEventListeners();
        return this._view;
    }

    _setEventListeners() {
        this._view.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenPopup();
        });
        this._view.querySelector('.element__delete').addEventListener('click', () => {
            this._remove();
        });
        this._view.querySelector('.element__like').addEventListener('click', (evt) => {
            this._like(evt);
        });
    }

    _like(evt) {
        evt.target.classList.toggle('element__like_pressed');
    }

    _remove() {
        this._view.remove();
    }

    _handleOpenPopup() {
        this._config.viewImagePicture.src = this._item.link;
        this._config.viewImagePicture.alt = this._item.title;
        this._config.viewCaption.textContent = this._item.title;
        this._popupOpen(this._config.popupOpenImageFull);
    }

}

export default Card;
