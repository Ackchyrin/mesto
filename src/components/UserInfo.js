class UserInfo {
    constructor(name, about, avatar) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(avatar)
    }

    setAvatar(link) {
        this._avatar.src = link;
    }

    get ID(){
        return this.id;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        };
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
        this.id = data._id;
    }
}

export default UserInfo;
