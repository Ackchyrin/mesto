class Api {
  constructor(address, headers ) {
      this.address = address,
      this._headers = headers
  }

  _checkResponse(){
    return (res => res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`)));
  }

  getInitialCards() {
      return fetch(`${this.address}/cards`, {
        headers: this._headers
      })
          .then (this._checkResponse());
  }

  aboutUser() {
      return fetch(`${this.address}/users/me`, {
        headers: this._headers
      })
          .then (this._checkResponse());
  }

  editProfile(data) {
      return fetch(`${this.address}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              name: data.name,
              about: data.about
          })
      })
          .then (this._checkResponse());
  }

  addNewCards({ name, link }) {
    return fetch(`${this.address}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then (this._checkResponse());
}

  deleteCard(dataId) {
      return fetch(`${this.address}/cards/${dataId}`, {
          method: 'DELETE',
          headers: this._headers
      })
          .then (this._checkResponse());
  }

  addlike(dataId) {
      return fetch(`${this.address}/cards/${dataId}/likes`, {
          method: 'PUT',
          headers: this._headers
      })
          .then (this._checkResponse());
  }

  removeLike(dataId) {
      return fetch(`${this.address}/cards/${dataId}/likes`, {
          method: 'DELETE',
          headers: this._headers
      })
          .then (this._checkResponse());
  }
  updateAvatar(data) {
      return fetch(`${this.address}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              avatar: data.link
          })
      })
          .then (this._checkResponse());
  }
}

export default Api;