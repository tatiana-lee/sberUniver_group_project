import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PostList } from './components/PostList'
import { News } from './components/News'
import api from './utils/api'
import { Info } from './components/Info'
import { NewPostButton } from './components/NewPostButton'
import './index.css'
import { Logo } from './components/Logo'
import PaginationRounded from './components/Pagination'
import { CreatePost } from './components/CreatePost'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { PostInfo } from './components/PostInfo'
import { EditPost } from './components/EditPost'
import { EditUser } from './components/EditUser'
import {SingInUp} from './components/SignInUp'

import UserContext from './contexts/userContext'
import ModalContext from './contexts/modalContext'
import FormModalContext from './contexts/formModalContext'

const theme = createTheme({
    palette: {
        primary: {
            main: '#373b69',
        },
        secondary: {
            main: '#22254b',
        },
    },
})

export const App = () => {
    const [postList, setPostList] = useState([])
    const [user, setUser] = useState(null)
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem('likes')) || []
    )
    const [modalState, setModalState] = useState({
        isOpen: false,
        msg: null,
    });
    const [modalFormState, setModalFormState] = useState({
        isOpen: false,
        msg: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setModalFormState(() => {
                return {
                    isOpen: true,
                    msg: 'Вы не авторизированы',
                };
            });
        }
    }, []);

    useEffect(() => {
        api.getCurrentUser()
            .then((user) => setUser(user))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        api.getPosts()
            .then((res) => setPostList(res))
            .catch((err) => console.log(err))
    }, [])

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(12)

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost)

    return (
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={{ user, setUser }}>
                <ModalContext.Provider value={{ modalState, setModalState }}>
                    <FormModalContext.Provider
                        value={{ modalFormState, setModalFormState }}
                    >
                        <div className="appContainer">
                            <Header>
                                <Logo />
                                <Info />
                            </Header>
                            <News />
                            <NewPostButton />
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <>
                                            <PostList
                                                postList={currentPosts}
                                                favorites={favorites}
                                                setFavorites={setFavorites}
                                            />
                                            <PaginationRounded
                                                postsPerPage={postsPerPage}
                                                totalPosts={postList.length}
                                                currentPage={currentPage}
                                                setCurrentPage={setCurrentPage}
                                            />
                                        </>
                                    }
                                />
                                <Route
                                    path="posts/:postID"
                                    element={
                                        <PostInfo setPostList={setPostList} />
                                    }
                                />
                                <Route
                                    path="users/:userID"
                                    element={<PostInfo />}
                                />
                                <Route
                                    path="user/edit"
                                    element={<EditUser />}
                                />
                                <Route
                                    path="posts/create"
                                    element={
                                        <CreatePost setPostList={setPostList} />
                                    }
                                />
                                <Route
                                    path="posts/:postID/edit"
                                    element={
                                        <EditPost setPostList={setPostList} />
                                    }
                                />
                                <Route
                                    path="user/signinup"
                                    element={<SingInUp />}
                                />

                            </Routes>
                            <Footer />
                        </div>
                    </FormModalContext.Provider>
                </ModalContext.Provider>
            </UserContext.Provider>
        </ThemeProvider>
    )
}
