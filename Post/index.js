import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    Avatar,
    Card,
    Grid,
    Typography,
    CardHeader,
    CardMedia,
    CardContent,
    IconButton,
    Chip,
    Stack,
    TextField,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MessageIcon from '@mui/icons-material/Message'
import { makeStyles } from '@material-ui/core/styles'
import api from '../../utils/api'

function stringToColor(string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff
        color += `00${value.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
}
function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.toUpperCase().split(' ')[0][0]}${
            name.toUpperCase().split(' ')[1][0]
        }`,
    }
}

const useStyles = makeStyles((theme) => ({
    container: {
        borderRight: '0.5px solid lightgrey',
    },
}))

export const Post = () => {
    const classes = useStyles()

    return (
        <Card sx={{ maxWidth: 1024 }}>
            <Grid container item xs={12} flexDirection="row" spacing={1}>
                <Grid item xs={8} className={classes.container}>
                    <Grid
                        container
                        item
                        xs={12}
                        flexDirection="row"
                        spacing={1}
                    >
                        <Grid item xs={10}>
                            <CardHeader
                                avatar={
                                    <Avatar {...stringAvatar('some author')} />
                                }
                                //<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                title="author.name"
                                subheader="author.about"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <CardMedia
                        component="img"
                        height="400"
                        image="img_url"
                        alt="postImage"
                    />

                    <Grid
                        container
                        item
                        xs={12}
                        flexDirection="row"
                        spacing={1}
                    >
                        <Grid item xs={10}>
                            <Stack direction="row" spacing={1}>
                                <Chip
                                    label="#tags"
                                    size="small"
                                    variant="outlined"
                                />
                                <Chip
                                    label="#tags"
                                    size="small"
                                    variant="outlined"
                                />
                                <Chip
                                    label="#tags"
                                    size="small"
                                    variant="outlined"
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body2" color="text.secondary">
                                01.01.2022
                            </Typography>
                        </Grid>
                    </Grid>

                    <CardContent>
                        <Typography variant="body2" color="text.primary">
                            some post text
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item xs={4}>
                    <Typography>comments</Typography>
                    <Grid item height="450px">
                        <CardHeader
                            avatar={<Avatar {...stringAvatar('some author')} />}
                            title="author"
                            subheader="comment blablalba"
                        />
                        <CardHeader
                            avatar={<Avatar {...stringAvatar('some author')} />}
                            title="author"
                            subheader="comment blablalba"
                        />
                        <CardHeader
                            avatar={<Avatar {...stringAvatar('some author')} />}
                            title="author"
                            subheader="comment blablalba"
                        />
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <TextField label="Оставить комментарий" />
                        <IconButton>
                            <MessageIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}
