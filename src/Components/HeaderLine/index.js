import React from "react";
import Typography from "@mui/material/Typography";
import style from "./style.module.css";
import cn from "classnames";
import { NewPostButton } from "../NewPostButton";

export const HeaderLine = ({ title, children }) => {
  return (
    <div className={style.HeaderLine_wrap}>
      <div className={cn(style.sectionInner, "sectionInner")}>
        {children}

        <Typography variant="h3" component="h3">
          {title ? title : "Тут будет заголовок"}
        </Typography>

        <NewPostButton />
      </div>
    </div>
  );
};
