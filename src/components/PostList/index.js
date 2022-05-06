import React from 'react'
import { PostCard } from '../PostCard'
import './index.css'


export const PostList = ({ postList, favorites, setFavorites}) => {
  return (
    <div className='posts'>
        {postList.map((e) => (
            <PostCard key={e._id} postText={e} isInFavorites={favorites.includes(e._id)} setFavorites={setFavorites}/>
        ))}
    </div>
  )
}
