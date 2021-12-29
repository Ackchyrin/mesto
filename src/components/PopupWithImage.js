import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector),
        this._cardImage = this._popup.querySelector('.open-image__picture'),
        this._cardImageCaprion = this._popup.querySelector('.open-image__caption')
        }
    
    open = (name, link) => {
        super.open();
        this._cardImage.src = link;
        this._cardImage.alt = name;
        this._cardImageCaprion.textContent = name;
    }
}

export default PopupWithImage;