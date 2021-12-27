class Section {
    constructor({renderer}, containerSelector){
        this._renderer = renderer,
        this._container = document.querySelector(containerSelector);
    }

    addItem(card) {
        this._container.prepend(card);
    }

    rendererItem(items, userId) {
        items.forEach((item) => {
            this._renderer(item, userId);
        });
    }

}

export default Section ;
