import Popup from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector),
        this._cardImage = this._popup.querySelector('.open-image__picture');
        }
    
    open = (link,title) => {
        super.open();
        this._cardImage.src = title;
        this._cardImage.alt = link;
        this._popup.querySelector('.open-image__caption').textContent = link;
    }
}

export default PopupWithImage;