import { config } from "./config";

const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
};
class Api {
  constructor({ url, token }) {
    this._url = url;
  }

  getPosts(itemID) {
    const requestUrl = itemID
      ? `${this._url}/posts/${itemID}`
      : `${this._url}/posts`;
    return fetch(requestUrl, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(onResponce);
  }
  addPosts(post) {
    return fetch(`${this._url}/posts`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(onResponce);
  }

  editPost(postID, editedPost) {
    return fetch(`${this._url}/posts/${postID}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedPost),
    }).then(onResponce);
  }

  getPostsOnPage(pageNumber, postsOnPage) {
    return fetch(
      `${this._url}/posts/paginate?page=${pageNumber}&limit=${postsOnPage}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then(onResponce);
  }

  getUserInfo(userID) {
    const requestUrl = userID
      ? `${this._url}/users/${userID}`
      : `${this._url}/users/`;
    return fetch(requestUrl, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(onResponce);
  }
  getMeInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(onResponce);
  }

  updateUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Сергей Сапелко",
        about: "",
      }),
    });
  }

  addLike(itemID) {
    return fetch(`${this._url}/posts/likes/${itemID}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(onResponce);
  }

  removeLike(itemID) {
    return fetch(`${this._url}/posts/likes/${itemID}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(onResponce);
  }
  search(searchQuery) {
    return fetch(`${this._url}/posts/search/?query=${searchQuery}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(onResponce);
  }

  addLike(itemID) {
    return fetch(`${this._url}/posts/likes/${itemID}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(onResponce);
  }

  deletePost(postID) {
    return fetch(`${this._url}/posts/${postID}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  addComment(postID, comment) {
    return fetch(`${this._url}/posts/comments/${postID}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    }).then(onResponce);
  }

  signUp(userData) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then(onResponce);
  }

  signIn(userData) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then(onResponce);
  }

  editCurentUser(updatedUserInfo) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserInfo),
    }).then(onResponce);
  }
  editCurentUserAvatar(updatedUserInfo) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserInfo),
    }).then(onResponce);
  }
}

export default new Api(config);
