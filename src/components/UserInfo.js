class UserInfo {
    constructor(name, about) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
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
