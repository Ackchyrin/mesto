import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector),
        this._cardImage = this._popup.querySelector('.open-image__picture');
        this._cardImageCaprion = this._popup.querySelector('.open-image__caption')
        }
    
    open = (link,title) => {
        super.open();
        this._cardImage.src = title;
        this._cardImage.alt = link;
        this._cardImageCaprion.textContent = link;
    }
}

export default PopupWithImage;