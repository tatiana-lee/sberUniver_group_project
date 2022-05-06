import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import api from './utils/api';

import { Header } from './Components/Header';
import  Logo  from './Components/Logo';
import Info from './Components/Info';
import { Search } from './Components/Search';
import { Footer } from './Components/Footer';

export const App = () => {

  const handleChangeSearchInput = (value) => {
    setSearchQuery(value);
}; 

  return (
    <div className='appContainer'>
    <Header>
      <Logo />
      <Search setQuery={handleChangeSearchInput} />
      <Info user={user} />
    </Header> 
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
    </Routes>
    <Footer>
      <Logo />
    </Footer>
  </div>
  )
}
