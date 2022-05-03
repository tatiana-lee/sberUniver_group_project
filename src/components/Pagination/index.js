import React from "react";
import { Pagination as PaginationMUI } from "@mui/material";

export const Pagination = ({ pagesCnt, setPage, page }) => {
  return (
    <PaginationMUI
      count={pagesCnt}
      variant="outlined"
      onChange={(event, value) => {
        setPage(value);
      }}
      page={page}
    />
  );
};
