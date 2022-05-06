import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

export const Logo = () => {
    return (
        <Link to="/">
            <div className="logoImg"></div>
        </Link>
    )
}
