import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send'
import { Chip, Grid, TextField } from '@mui/material'

export const Post = () => {
    return (
        <Card sx={{ maxWidth: 1024 }}>
            <Grid item container xs={12} flexDirection="row">
                <Grid item xs={8}>
                    <Grid item container xs={12}>
                        <Grid item xs={10}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{ bgcolor: red[500] }}
                                        aria-label="recipe"
                                    >
                                        R
                                    </Avatar>
                                }
                                title="author.name"
                                subheader="author.about"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <CardMedia
                        component="img"
                        height="500"
                        image=""
                        alt="postimage"
                    />
                    <Grid item container xs={12}>
                        <Grid item xs={10} spacing={2}>
                        

                            <Chip label="#tags" variant="outlined" />
                            <Chip label="#tags" variant="outlined" />
                            <Chip label="#tags" variant="outlined" />
                        
                        </Grid>
                        <Grid item xs={2}>
                            created date
                        </Grid>
                    </Grid>
                    ---
                    <CardContent>
                        <Typography variant="h6">post.title</Typography>
                        <Typography paragraph>post.text</Typography>
                    </CardContent>
                </Grid>

                <Grid item container xs={4} flexDirection="column">
                    <Typography>comments</Typography>
                    <Grid item container flexDirection="column" height="600px">
                        <CardHeader
                            avatar={
                                <Avatar
                                    sx={{ bgcolor: red[500] }}
                                    aria-label="recipe"
                                >
                                    R
                                </Avatar>
                            }
                            title="author.name"
                            subheader="author.about"
                        />
                        <CardHeader
                            avatar={
                                <Avatar
                                    sx={{ bgcolor: red[500] }}
                                    aria-label="recipe"
                                >
                                    R
                                </Avatar>
                            }
                            title="author.name"
                            subheader="author.about"
                        />
                        <CardHeader
                            avatar={
                                <Avatar
                                    sx={{ bgcolor: red[500] }}
                                    aria-label="recipe"
                                >
                                    R
                                </Avatar>
                            }
                            title="author.name"
                            subheader="author.about"
                        />
                    </Grid>

                    <Grid item container>
                    <Grid item>

                        <TextField
                            id="filled-basic"
                            label="Добавить комментарий"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item>

                        <IconButton>
                            <SendIcon />
                        </IconButton>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}
