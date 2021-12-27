import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector),
        this._cardImage = this._popup.querySelector('.open-image__picture'),
        this._cardImageCaprion = this._popup.querySelector('.open-image__caption')
        }
    
    open = (title, link) => {
        super.open();
        this._cardImage.src = link;
        this._cardImage.alt = title;
        this._cardImageCaprion.textContent = title;
    }
}

export default PopupWithImage;