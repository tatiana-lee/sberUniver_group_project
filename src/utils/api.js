import { config } from "./config";

const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
};
class Api {
  constructor({ url, token }) {
    this._url = url;
    // this._token = token;
    localStorage.setItem("token", token);
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
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedPost),
    }).then(onResponce)
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
    const requestUrl = userID ? `${this._url}/users/${userID}` : `${this._url}/users/`
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
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
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

  // getMyFavorite(userID) {
  //     let myFavorite = [];

  //     this.getPosts().then((data)=>{
  //        data.forEach((el)=>{
  //            console.log(el);
  //            if (el.likes.includes(userID)){
  //             myFavorite.push(el._id)
  //            }
  //         })
  //         return myFavorite;
  //     })
  // }
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
}

export default new Api(config);
