import React, { useContext, useState } from 'react'

import { TextField, Modal, Typography, Button, Box, Grid } from '@mui/material';

import UserContext from '../../contexts/userContext';
import api from '../../utils/api'

import './index.css'
import { useNavigate } from 'react-router-dom';


export const SingInUp = () => {
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmailChange = ({ target }) => {
        setEmail(target.value);
    };

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value);
    };

    const onSignIn = (signedInUser) => {
        const { token, data } = signedInUser;
        localStorage.setItem('token', JSON.stringify(token));
        setUser(data);
        navigate('/')
    };


    const signUp = () => {
        api.signUp({ email, password })
            .then((createdUser) => {
                console.log({ createdUser });
                return api.signIn({ email, password });
            })
            .then(onSignIn)
    };

    const signIn = () => {
        api.signIn({ email, password })
            .then(onSignIn)
    }
    return (<div className='signForm'>
            <Grid item container 
            flexDirection='column'
            spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5'>Введите ваши данные </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label='Email'
                        variant='outlined'
                        required value={email} onChange={handleEmailChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label='Password'
                            type='password'
                            variant='outlined'
                            required
                            value={password}
                            onChange={handlePasswordChange}
                    />
                </Grid>
                <Grid item container spacing={2} xs={12} flexDirection='row'>

                <Grid item xs={6}>
                        <Button fullWidth variant='contained' color='primary' size='small' onClick={signUp}>
                            Регистрация
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant='contained' color='primary' size='small' onClick={signIn}>
                            Логин
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            </div>)
}
