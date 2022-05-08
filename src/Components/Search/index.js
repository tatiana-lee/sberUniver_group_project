import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { ReactComponent as CloseSearch } from '../../../public/assets/ic-search.svg';
import './index.css';
import api from '../../utils/api';

export const Search = ({ setQuery, setPostsState }) => {
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setQuery(searchText);
    }, [searchText]);

    const handleClick = () => {
        api.search(searchText)
        .then((data)=>{
            setPostsState(data);
        })
        .catch((err) => {
            alert(err);
          });
        setSearchText('');
    };

    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

  return (
    <div className='search'>
            <input
                type='text'
                placeholder='Найдем пост'
                className='search__input'
                value={searchText} 
                onChange={handleChange}
            />
            <Link to={`/search/title_${searchText}`}>
            <button className='search__btn'>{searchText && <CloseSearch onClick={handleClick} />}</button>
              </Link>
        </div>
  )
}
