import React from "react";
import { Pagination as PaginationMUI } from "@mui/material";


import styles from "./style.module.css";
import cn from "classnames";

export const Pagination = ({ pagesCnt, setPage, page }) => {
  return (
   
    <PaginationMUI
      count={pagesCnt}
      variant="outlined"
      onChange={(event, value) => {
        setPage(value);
      }}
      page={page}
      className={cn(styles.paginationWrap)}
    />
  );
};
