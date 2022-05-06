import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../utils/api'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'

export const DeleteButton = ({setPostList}) => {
    const params = useParams()
    const navigate = useNavigate()

    const handleClick = () => {
        api.deletePost(params.postID)
            .then((data) => {
                alert('Пост удален')
                api.getPosts().then((res) => setPostList(res))
                navigate('/')
            })
            .catch((err) => {
                alert(err + ' - Удаление чужого поста запрещено')
            })
    }

    return (
        <IconButton onClick={handleClick}>
            <DeleteIcon variant="outlined" />
        </IconButton>
    )
}
