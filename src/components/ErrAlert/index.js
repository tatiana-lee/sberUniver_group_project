import { Alert } from '@mui/material'
import React from 'react'

export const ErrAlert = (err) => {
  return (
    <Alert severity="error">Ошибка: {err}</Alert>
  )
}
