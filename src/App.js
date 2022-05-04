import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { PostList } from "./components/PostList";

import api from "./utils/api";

import "normalize.css";
import "./App.css";
import { TestComponent } from "./components/testComponent";

function App() {
  const [postsState, setPostsState] = useState([]);
  const [pagesCnt, setPagesCnt] = useState(1);
  const [login, setLogin] = useState(true);
  const [updateAfterDelete, setUpdateAfterDelete] = useState(false);
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

  return (
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
              setUpdateAfterDelete={setUpdateAfterDelete}
              login={login}
              setPagesCnt={setPagesCnt}
              setPostsState={setPostsState}
            />
          }
        />
        <Route path='search/tag_:tag' element={
          <PostList
          list={postsState}
          pagesCnt={pagesCnt}
          favorite={favorite}
          setFavorite={setFavorite}
          user={user}
          setUpdateAfterDelete={setUpdateAfterDelete}
          login={login}
          setPagesCnt={setPagesCnt}
          setPostsState={setPostsState}
        />
        } />
      </Routes>
    </div>
  );
}

export default App;
