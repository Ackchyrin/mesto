import Popup from "./Popup";

class PopupWithEditAvatar extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }
    open = () => {
        super.open();
    }
}

export default PopupWithEditAvatar;