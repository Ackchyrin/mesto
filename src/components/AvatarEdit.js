class AvatarEdit {
    constructor(avatar) {
        this._avatar = document.querySelector(avatar)
    }

    setAvatar(link) {
        this._avatar.src = link;
    }
}

export default AvatarEdit;