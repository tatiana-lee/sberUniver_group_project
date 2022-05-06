import dayjs from 'dayjs'
import './index.css'

import React from 'react'

export const News = () => {
    const currentDate = dayjs().format('MMMM D, YYYY')

    return (
        <div className="news">
            <div className="date">Some news for today {currentDate}</div>
        </div>
    )
}
