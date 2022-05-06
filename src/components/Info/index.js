import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/userContext';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import PersonIcon from '@mui/icons-material/Person'
import { IconButton } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import './index.css'

export const Info = () => {
    const navigate = useNavigate()
    const { user } = useContext(UserContext);

    const navigateToEditPage = () => {
      navigate('user/edit');
  };
    const signOut = () => {
        localStorage.setItem('token', '')
        navigate('user/signinup')
    }
    return (
        <div className="user">
            Пользователь: {user?.name}
            <IconButton onClick={navigateToEditPage}>
                <PersonIcon sx={{ color: blueGrey[50] }} />
            </IconButton>
            <IconButton onClick={signOut}>
                <ExitToAppIcon sx={{ color: blueGrey[50] }} />
            </IconButton>
        </div>
    )
}
