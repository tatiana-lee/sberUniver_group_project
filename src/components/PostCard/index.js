import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import './index.css'
import { red } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { Grid, Stack, CardHeader, Avatar, CardActionArea } from '@mui/material'

export const PostCard = ({ postText, isInFavorites, setFavorites }) => {
    const [likesQty, setLikesQty] = useState(postText.likes.length)
    const navigate = useNavigate()

    const writeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key)) || []
        storage.push(value)
        localStorage.setItem(key, JSON.stringify(storage))
    }

    const removeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key))
        const filteredStorage = storage.filter((itemID) => value !== itemID)
        localStorage.setItem(key, JSON.stringify(filteredStorage))
    }

    const addFavorite = () => {
        writeLS('likes', postText._id)
        setFavorites((prevState) => [...prevState, postText._id])
        setLikesQty((prevState) => (prevState += 1))
        api.addLike(postText._id)
            .then((addedItem) => {
                return addedItem
            })
            .catch((err) => {
                alert(err)
            })
    }

    const removeFavorite = () => {
        removeLS('likes', postText._id)
        setFavorites((prevState) =>
            prevState.filter((itemID) => postText._id !== itemID)
        )
        setLikesQty((prevState) => (prevState -= 1))
        api.deleteLike(postText._id)
            .then((addedItem) => {
                return addedItem
            })
            .catch((err) => {
                alert(err)
            })
    }
    const handleClick = () => {
        navigate(`posts/${postText._id}`)
    }

    return (
        <Card sx={{ minWidth: 275 }} className="postCard">
                <CardActionArea onClick={handleClick}>
                    <CardContent>
                        <Grid container direction="column">
                            <Grid item xs={10}>
                                <CardHeader
                                    sx={{ padding: '0 0 15px 0' }}
                                    avatar={
                                        <Avatar
                                            alt="author"
                                            src={postText.author.avatar}
                                        />
                                    }
                                    title={
                                        postText.author.name.length > 20
                                            ? postText.author.name.slice(
                                                  0,
                                                  20
                                              ) + '...'
                                            : postText.author.name
                                    }
                                    subheader={postText.author.about}
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    sx={{ fontSize: 16 }}
                                    color="darkblue"
                                    height="25px"
                                    fontWeight="bold"
                                    gutterBottom
                                >
                                    {postText.title.length > 20
                                        ? postText.title.slice(0, 21) + '...'
                                        : postText.title}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" height="90px">
                                    {postText.text.length > 100
                                        ? postText.text.slice(0, 101) + '...'
                                        : postText.text}
                                </Typography>
                            </Grid>
                            <Grid item></Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={0}
                paddingLeft='10px'
            >
                <IconButton
                    onClick={isInFavorites ? removeFavorite : addFavorite}
                    sx={{ fontSize: 14 }}
                >
                    <FavoriteIcon
                        sx={{
                            color: isInFavorites ? red[500] : null,
                        }}
                    />
                </IconButton>
                <Typography
                    variant="body2"
                    sx={{
                        textAlign: 'center',
                        lineHeight: 3,
                    }}
                >
                    {likesQty}
                </Typography>
            </Stack>
            {/* <div className='postImage'>
                <img src={postText.image}></img>
            </div> */}
        </Card>
    )
}
