import * as React from 'react'
import Button from '@mui/material/Button'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Link } from 'react-router-dom'

export const GoBackButton = () => {
    const styleBtn = {
        top: '100px',
        left: '20px',
        position: 'fixed',
    }
    return (
            <Link to="/">
                <Button variant="contained" style={styleBtn}><ArrowBackIosIcon />Go Back</Button>
            </Link>
    )
}