import React from 'react';
import style from './style.module.css';

export const Footer = ({ children }) => {
  return (
    <div className={style.footerContainer}>
        <div className={style.sectionInner}>
            { children }
        </div>
    </div>
  )
}
