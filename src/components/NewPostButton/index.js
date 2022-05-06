import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'

export const NewPostButton = () => {
    const styleBtn = {
        top: '100px',
        right: '20px',
        position: 'fixed',
    }
    return (
        <Stack spacing={2} direction="row">
            <Link to="posts/create">
                <Button variant="contained" style={styleBtn}>New Post</Button>
            </Link>
        </Stack>
    )
}
