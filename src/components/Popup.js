class Popup{
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    open(){
      this._popup.classList.add('popup_open');
      document.addEventListener('keydown',this._handleEscClose);
      }
        
      close() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEscClose);
      }

    _handleEscClose(event) {
      if (event.key === 'Escape') {
        this.close();
        }
    }
  
    _closeWindowPopup (event) {
        if (event.target == this._popup) {
          this.close();
        }
    }
  
    setEventListeners(){
      this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());
      this._popup.addEventListener('click', (event) => this._closeWindowPopup(event));
    }

}

export default Popup;
