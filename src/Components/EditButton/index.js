import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../utils/api'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'

export const EditButton = () => {
    const params = useParams()
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('edit')
    }

    return (
            <IconButton onClick={handleClick}>
                <EditIcon variant="outlined" />
            </IconButton>
    )
}
