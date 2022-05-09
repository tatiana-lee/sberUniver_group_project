import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import { Post } from "./components/Post";
import { PostList } from "./components/PostList";
import Modal from "./components/Modal";
import ModalContext from "./contexts/modalContext";

import UserContext from './contexts/UserContext';


import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { TextField, Grid, Typography } from "@mui/material";


import { Header } from "./Components/Header";
import Logo from "./Components/Logo";
import Info from "./Components/Info";
import { Search } from "./Components/Search";
import { Footer } from "./Components/Footer";
import { EditPost } from "./Components/EditPost";
import { CreatePost } from "./Components/CreatePost";
import { NewPostButton } from "./Components/NewPostButton";
import { EditUser } from './Components/EditUser';
import { User } from './Components/User';

import api from "./utils/api";

import "normalize.css";
import "./App.css";

function App() {
  const [postsState, setPostsState] = useState([]);
  const [pagesCnt, setPagesCnt] = useState(1);
  const [login, setLogin] = useState(localStorage.getItem("token") === "" ||localStorage.getItem("token") === null ? false : true);
  const [user, setUser] = useState(null);
  const [favorite, setFavorite] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeSearchInput = (value) => {
    setSearchQuery(value);
  };

  const handleEmailChange = ({ target }) => {
    setEmail(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };


  const signUp = () => {
    console.log('signUp');

    api
      .signUp({ email, password })
      .then((createdUser) => {
        console.log({ createdUser });
        return api.signIn({ email, password });
      })
      .then((data) => {
        setModalState(() => {
          return {
              isOpen: true,
              msg: `Вы успешно зарегистрировались!`,
          }
        })
      })
      .catch((err) => {
        setModalState(() => {
          return {
              isOpen: true,
              msg: `Ошибка регистрации! Попробуйте еще раз`,
          }
        })
      });
  };

  const signIn = () => {
    console.log('signIn');
    api
      .signIn({ email, password })
      .then((data) => {
        localStorage.setItem("userID", data.data._id);
        localStorage.setItem("token", data.token);
        setModalState(() => {
          return {
              isOpen: true,
              msg: `Вы успешно авторизированы!`,
          }
      })
        setLogin(true);
      })
      .catch((err) => {
        setModalState(() => {
          return {
              isOpen: true,
              msg: `Пользователь не найден`,
          }
      })
      });
  };

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

  const styleBtn = {
    width: '100%'
}

  return (

    <UserContext.Provider value={{ user, setUser,  login, setLogin}}>
    <ModalContext.Provider value={{ modalState, setModalState }}>
      <Modal />
      <div className="appContainer">
        <Header>
          <Logo />
          <Search setQuery={handleChangeSearchInput} setPostsState={setPostsState}/>
          <Info user={user} setPostsState={setPostsState} setFavorite={setFavorite}/>
        </Header>
        <NewPostButton />
        <Routes>
        <Route
          path="/"
          element={
            <>
              {
              !login ?
              (
                <div className="content__cards">
                  <Typography>Войти</Typography>
                  <Grid container flexDirection="column" spacing="10">
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        required
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        onClick={()=>signIn()}
                      >
                        Войти
                      </Button>
                      <Link to={'registration'} style={styleBtn}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="small"
                          style={styleBtn}
                          // onClick={()=>signUp()}
                          >
                          Регистрация
                        </Button>
                        </Link>
                  </Grid>
                </div>
              ) : (
                <Navigate to="all_posts" />
              )}
            </>
          }
        />
        <Route
          path="registration"
          element={
            <>
              {
              !login ?
              (
                <div className="content__cards">
                  <Typography>Регистрация</Typography>
                  <Grid container flexDirection="column" spacing="10">
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        required
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                      />
                        <Button
                          type="submit"
                          variant="contained"
                          size="small"
                          onClick={()=>signUp()}
                          >
                          Зарегистрироваться
                        </Button>
                  </Grid>
                </div>
              ) : (
                <Navigate to="all_posts" />
              )}
            </>
          }
        />
          <Route
            path="all_posts"
            element={
              login ?
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
              : <Navigate to="/" />

            }
          />
          <Route path="post/:postID" element={login ?<Post />: <Navigate to="/" />} />
          <Route
            path="post/:postID/edit"
            element={login ?<EditPost setPostsState={setPostsState} />: <Navigate to="/" />}
          />
          <Route
            path="posts/create"
            element={login ?<CreatePost setPostsState={setPostsState} />: <Navigate to="/" />}
          />
          <Route
            path="search/tag_:tag"
            element={login ?
              <PostList
                list={postsState}
                pagesCnt={pagesCnt}
                favorite={favorite}
                setFavorite={setFavorite}
                user={user}
                login={login}
                setPagesCnt={setPagesCnt}
                setPostsState={setPostsState}
              />: <Navigate to="/" />
            }
          />
          <Route
            path="search/title_:title"
            element={login ?
              <PostList
                list={postsState}
                pagesCnt={pagesCnt}
                favorite={favorite}
                setFavorite={setFavorite}
                user={user}
                login={login}
                setPagesCnt={setPagesCnt}
                setPostsState={setPostsState}
              />: <Navigate to="/" />
            }
          />
          <Route
            path="post/my_:posts"
            element={login ?
              <PostList
                list={postsState}
                pagesCnt={pagesCnt}
                favorite={favorite}
                setFavorite={setFavorite}
                user={user}
                login={login}
                setPagesCnt={setPagesCnt}
                setPostsState={setPostsState}
              />: <Navigate to="/" />
            }
          />
          <Route
            path="post/my_:favorite"
            element={login ?
              <PostList
                list={postsState}
                pagesCnt={pagesCnt}
                favorite={favorite}
                setFavorite={setFavorite}
                user={user}
                login={login}
                setPagesCnt={setPagesCnt}
                setPostsState={setPostsState}
              />: <Navigate to="/" />
            }
          />

          <Route path='user/edit' element={<EditUser />} />
          <Route path='user' element={<User />} />

        </Routes>
        <Footer>
          <Logo />
        </Footer>
      </div>
    </ModalContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
