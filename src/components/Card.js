class Card {
    constructor(config, item, cardTemplate, openViewPopup) {
        this._item = item,
        this._view = cardTemplate.querySelector('.element').cloneNode(true),
        this._cardImage = this._view.querySelector('.element__image'),
        this._cardDescription =  this._view.querySelector('.element__description'),
        this._openPopup = openViewPopup,
        this._handleCardClick = this._handleCardClick.bind(this);
    }

    addCard() {
        this._cardImage.src = this._item.link;
        this._cardImage.alt = this._item.title;
        this._cardDescription.textContent = this._item.title;
        this._setEventListeners();
        return this._view;
    }

    _handleCardClick() {
        this._openPopup(this._item.title, this._item.link);
    }

    _like(evt) {
        evt.target.classList.toggle('element__like_pressed');
    }

    _remove() {
        this._view.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._view.querySelector('.element__delete').addEventListener('click', () => {
            this._remove();
        });
        this._view.querySelector('.element__like').addEventListener('click', (evt) => {
            this._like(evt);
        });
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._item));
    }

}

export default Card;
