class UserInfo {
    constructor(nameSelector, aboutSelector) {
        this._nameSelector = document.querySelector(nameSelector),
        this._aboutSelector = document.querySelector(aboutSelector)
    }

    getUserInfo() {
        const data = { name: this._nameSelector.textContent, about: this._aboutSelector.textContent };
        return data;
    }

    setUserInfo(name, about) {
        this._nameSelector.textContent = name;
        this._aboutSelector.textContent = about;
    }
}

export default UserInfo;
