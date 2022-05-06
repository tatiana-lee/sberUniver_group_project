import React from 'react'
import './index.css'
import GitHubIcon from '@mui/icons-material/GitHub'
import { IconButton } from '@mui/material'
import { blueGrey } from '@mui/material/colors';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__container">
            {/* <Link href='https://github.com/tatiana-lee'> */}

                <IconButton href='https://github.com/tatiana-lee'>
                    <GitHubIcon sx={{ color: blueGrey[50] }} />
                </IconButton>
            {/* </Link> */}
                Дизайнер из меня ... от слова совсем -_-
            </div>
        </div>
    )
}
