import React from 'react';
import Logo from '../Logo';
import Info from '../Info';
import { Search } from '../Search';

import style from './style.module.css';

export const Header = ({ children }) => {
  return (
    <div className={style.header}>
      <div className={style.header_wrapper}>
        {children}
        </div>
    </div>
  );
};
