import {
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardHeader,
    Avatar,
    Stack,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/api'
import { DeleteButton } from '../DeleteButton'
import './index.css'
import { GoBackButton } from '../GoBackButton'
import { EditButton } from '../EditButton'

export const PostInfo = ({setPostList}) => {
    const [post, setPost] = useState(null)
    const [commentAuthor, setCommentAuthor] = useState(null)
    const [user, setUser] = useState(null)
    const params = useParams()

    useEffect(() => {
        api.getPosts(params.postID)
            .then((data) => {
                setPost(data)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        api.getUserById(params.userID)
            .then((data) => {
                setCommentAuthor(data)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        api.getCurrentUser()
            .then((user) => setUser(user))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className="postInfo">
            <GoBackButton />
            {post && (
                <Card>
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
                                    <Avatar
                                        alt="avatar"
                                        src={post.author.avatar}
                                    />
                                }
                                title={post.author.name}
                                subheader={post.author.about}
                            />
                        </Grid>
                        <Grid
                            container
                            item
                            xs={2}
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={1}
                            paddingRight="10px"
                        >
                            {post.author._id === user?._id ? (
                                <Stack direction="row">
                                    <EditButton />
                                    <DeleteButton setPostList={setPostList}/>
                                </Stack>
                            ) : (
                                <></>
                            )}
                        </Grid>
                    </Grid>
                    <CardMedia
                        component="img"
                        alt="post photo"
                        height="500"
                        width="500"
                        image={post.image}
                    ></CardMedia>
                    <CardContent>
                        <Typography>Заголовок: {post.title}</Typography>
                        <Typography>Описание: {post.text}</Typography>
                        {/* <Grid item> */}
                        Комментарии:
                        {post.comments?.map((e, i) => (
                            <Typography key={i}>
                                {commentAuthor?.map((user) =>
                                    user._id === e.author ? user.name : ''
                                )}
                                : {e.text}
                            </Typography>
                        ))}
                        {/* </Grid> */}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
