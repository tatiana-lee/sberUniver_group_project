import React, { useContext, useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link as LinkRoute } from "react-router-dom";

import UserContext from '../../contexts/UserContext';

import { Grid, Typography, TextField, Button } from '@mui/material';

export const EditUser = () => {
    const { user, setUser} = useContext(UserContext);

    const [userName, setUserName] = useState('');
    const [userAbout, setUserAbout] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    const handleClick = () => {
        

        api.editCurentUserAvatar({ avatar: userAvatar })
            .then((data) => {
                api.editCurentUser({ name: userName, about: userAbout })
                .then((data) => {
                    setUser(data);
                })
                .catch((err) => alert(err));
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        user && setUserName(user.name);
        user && setUserAbout(user.about);
        user && setUserAvatar(user.avatar);
    }, [user]);

    return (
        <Grid container flexDirection='column' spacing='10'>
            <Grid item>
                <Typography variant='h3'>Редактировать пользователя </Typography>
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
                <img
                    src={`${userAvatar}`}
                    alt={user?.name}
                />
                <TextField
                    fullWidth
                    label='Ссылка на аватар'
                    variant='outlined'
                    value={userAvatar}
                    onChange={({ target }) => {
                        setUserAvatar(target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <LinkRoute to={'/user'}>
                    <Button onClick={handleClick} variant='contained' color='secondary' size='small'>
                        Сохранить
                    </Button> 
                </LinkRoute>
            </Grid>
        </Grid>
    );
};
