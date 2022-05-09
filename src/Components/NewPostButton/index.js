import React, {useContext } from 'react';

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import UserContext from '../../contexts/UserContext.js';
export const NewPostButton = () => {
    const styleBtn = {
        top: '100px',
        right: '20px',
        position: 'fixed',
    }   
    const { login, setLogin } = useContext(UserContext);
    return (
        login ?
        <Stack spacing={2} direction="row">
            <Link to="posts/create">
                <Button variant="contained" style={styleBtn}>Новый пост</Button>
            </Link>
        </Stack>
        : null
    )
}
