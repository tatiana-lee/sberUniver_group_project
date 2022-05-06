import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { PostList } from "./components/PostList";
import Modal from "./components/Modal";
import ModalContext from "./contexts/modalContext";

import api from "./utils/api";

import "normalize.css";
import "./App.css";

function App() {
  const [postsState, setPostsState] = useState([]);
  const [pagesCnt, setPagesCnt] = useState(1);
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    if (login) {
      api
        .getMeInfo()
        .then((data) => {
          setUser(data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [login]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    msg: null,
  });

  return (
    <ModalContext.Provider value={{ modalState, setModalState }}>
      <Modal />
      <div className="appContainer">
        <Routes>
          <Route
            path="/"
            element={
              <PostList
                list={postsState}
                pagesCnt={pagesCnt}
                favorite={favorite}
                setFavorite={setFavorite}
                user={user}
                login={login}
                setPagesCnt={setPagesCnt}
                setPostsState={setPostsState}
              />
            }
          />
        </Routes>
      </div>
    </ModalContext.Provider>
  );
}

export default App;
