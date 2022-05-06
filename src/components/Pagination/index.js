import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { blue, yellow } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './index.css'

const theme = createTheme({
    palette: {
        primary: {
            main: yellow[100],
        },
        secondary: {
            main: blue[900],
        },
    },
})

export default function PaginationRounded({ currentPage, totalPosts, postsPerPage, setCurrentPage }) {
    const handleChange = (event, value) => {
        setCurrentPage(value);
      };

    const pagesNumber = Math.ceil(totalPosts / postsPerPage)

    return (
        <div className='pagination'>
        <ThemeProvider theme={theme}>
            <Stack spacing={2} color='standard'>
                <Pagination
                    count={pagesNumber}
                    variant="outlined"
                    shape="rounded"
                    color='secondary'
                    page={currentPage}
                    onChange={handleChange}
                />
            </Stack>
        </ThemeProvider>
        </div>
            
    )
}
