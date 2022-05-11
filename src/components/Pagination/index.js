import React ,{useContext} from "react";
import { Pagination as PaginationMUI } from "@mui/material";

import "./style.css";
import styles from "./style.module.css";
import cn from "classnames";
import PageContext from "../../contexts/PageContext";
export const Pagination = ({ pagesCnt }) => {
    const { page, setPage, setFlag } = useContext(PageContext);
  return (
    <PaginationMUI
      count={pagesCnt}
      variant="outlined"
      onChange={(event, value) => {
        setPage(value);
        setFlag(true);
      }}
      page={page}
      className={cn(styles.paginationWrap)}
    />
  );
};
