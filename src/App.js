import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import { Post } from './components/Post'
import { PostList } from './components/PostList'
import Modal from './components/Modal'
import ModalContext from './contexts/modalContext'
import { Header } from './Components/Header'
import Logo from './Components/Logo'
import Info from './Components/Info'
import { Search } from './Components/Search'
import { Footer } from './Components/Footer'
import { EditPost } from './Components/EditPost'
import {CreatePost} from './Components/CreatePost'
import { NewPostButton } from './Components/NewPostButton'
import api from './utils/api'

import 'normalize.css'
import './App.css'

function App() {
    const [postsState, setPostsState] = useState([])
    const [pagesCnt, setPagesCnt] = useState(1)
    const [login, setLogin] = useState(true)
    const [user, setUser] = useState(null)
    const [favorite, setFavorite] = useState([])
    const [searchQuery, setSearchQuery] = useState([])

    const handleChangeSearchInput = (value) => {
        setSearchQuery(value)
    }

    useEffect(() => {
        if (login) {
            api.getMeInfo()
                .then((data) => {
                    setUser(data)
                })
                .catch((err) => {
                    alert(err)
                })
        }
    }, [login])

    const [modalState, setModalState] = useState({
        isOpen: false,
        msg: null,
    })

    return (
        <ModalContext.Provider value={{ modalState, setModalState }}>
            <Modal />
            <div className="appContainer">
                <Header>
                    <Logo />
                    <Search setQuery={handleChangeSearchInput} />
                    <Info user={user} />
                </Header>
                    <NewPostButton />
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
                    <Route path="post/:postID" element={<Post />} />
                    <Route
                        path="post/:postID/edit"
                        element={<EditPost setPostsState={setPostsState} />}
                    />
                    <Route
                        path="posts/create"
                        element={<CreatePost setPostsState={setPostsState} />}
                    />
                </Routes>
                <Footer>
                    <Logo />
                </Footer>
            </div>
        </ModalContext.Provider>
    )
}

export default App
