import React, { useContext, useEffect, useState } from 'react';
import api from '../../utils/api';
import './index.css'

import UserContext from '../../contexts/userContext';

import { Grid, Typography, TextField, Button } from '@mui/material';
import { GoBackButton } from '../GoBackButton';

export const EditUser = () => {
    const { user, setUser } = useContext(UserContext);

    const [userName, setUserName] = useState('');
    const [userAbout, setUserAbout] = useState('');

    const handleClick = () => {
        api.editCurentUser({ name: userName, about: userAbout })
            .then((data) => {
                console.log(data);
                setUser(data);
            })
            .catch((err) => alert(err));
    };
    
    useEffect(() => {
        user && setUserName(user.name);
        user && setUserAbout(user.about);
    }, [user]);

    return (
        <div className='editUser'>
<GoBackButton />
        <Grid container flexDirection="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}>
            <Grid item>
                <Typography variant='h5'>Редактировать пользователя </Typography>
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='Имя'
                    variant='outlined'
                    value={userName}
                    onChange={({ target }) => {
                        setUserName(target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='Доп.Информация'
                    variant='outlined'
                    value={userAbout}
                    onChange={({ target }) => {
                        setUserAbout(target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <Button onClick={handleClick} variant='contained' color='primary' size='small'>
                    Сохранить
                </Button>
            </Grid>
        </Grid>
        </div>
    );
};
