import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Post } from './components/Post'

export const App = () => {
  return (
    <div className='appContainer'>
    <Routes>
      <Route path='posts/:postID' element={<Post />}/>
    </Routes>
    </div>
  )
}
