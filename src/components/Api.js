class Api {
  constructor({ address, token }) {
      this.address = address,
      this.token = token
  }

  getInitialCards() {
      return fetch(`${this.address}/cards`, {
          headers: {
              authorization: this.token
          }
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              } else {
                  return Promise.reject(`Ошибка: ${res.status}`);
              }
          });
  }

  aboutUser() {
      return fetch(`${this.address}/users/me`, {
          headers: {
              authorization: this.token
          }
      })
          .then(result => {
              if (result.ok) {
                  return result.json();
              } else {
                  return Promise.reject(`Ошибка: ${result.status}`);
              }
          })
  }

  editProfile(data) {
      return fetch(`${this.address}/users/me`, {
          method: 'PATCH',
          headers: {
              authorization: this.token,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: data.name,
              about: data.about
          })
      })
          .then(result => {
              if (result.ok) {
                  return result.json();
              } else {
                  return Promise.reject(`Ошибка: ${result.status}`);
              }
          })
  }

  addNewCards({ name, link }) {
    return fetch(`${this.address}/cards`, {
        method: 'POST',
        headers: {
            authorization: this.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(result => {
            if (result.ok) {
                return result.json();
            } else {
                return Promise.reject(`Ошибка: ${result.status}`);
            }
        })
}

  deleteCard(dataId) {
      return fetch(`${this.address}/cards/${dataId}`, {
          method: 'DELETE',
          headers: {
              'authorization': this.token,
              'Content-Type': 'application/json'
          }
      })
          .then(result => {
              if (result.ok) {
                  return result.json();
              } else {
                  return Promise.reject(`Ошибка: ${result.status}`);
              }
          })
  }

  addlike(dataId) {
      return fetch(`${this.address}/cards/${dataId}/likes`, {
          method: 'PUT',
          headers: {
              'authorization': this.token,
              'Content-Type': 'application/json'
          }
      })
          .then(result => {
              if (result.ok) {
                  return result.json();
              } else {
                  return Promise.reject(`Ошибка: ${result.status}`);
              }
          })
  }

  removeLike(dataId) {
      return fetch(`${this.address}/cards/${dataId}/likes`, {
          method: 'DELETE',
          headers: {
              'authorization': this.token,
              'Content-Type': 'application/json'
          }
      })
          .then(result => {
              if (result.ok) {
                  return result.json();
              } else {
                  return Promise.reject(`Ошибка: ${result.status}`);
              }
          })
  }
  updateAvatar(data) {
      return fetch(`${this.address}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
              'authorization': this.token,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              avatar: data.link
          })
      })
          .then(result => {
              if (result.ok) {
                  return result.json();
              } else {
                  return Promise.reject(`Ошибка: ${result.status}`);
              }
          })
  }
}

export default Api;