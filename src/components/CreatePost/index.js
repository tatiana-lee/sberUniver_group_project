import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Grid, TextField } from '@mui/material'
import api from '../../utils/api'
import './index.css'
import { GoBackButton } from '../GoBackButton'

export const CreatePost = ({setPostList}) => {
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        const {
            target: { title, text },
        } = event
        api.addPost({
            title: title.value.trim(),
            text: text.value.trim(),
        }).then(
            api.getPosts()
            .then((data) => {
                setPostList(data)
                navigate('/')
            })
            .catch((err) => alert(err))
        )
            .catch((err) => alert(err))
    }

    return (
        <div className="addPost">
            <GoBackButton />
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <TextField
                            label="Заголовок"
                            name="title"
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Текст"
                            name="text"
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                        >
                            Добавить пост
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}
