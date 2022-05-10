import React, { useContext } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext.js";
import style from "./style.module.css";

export const NewPostButton = () => {
  const styleBtn = {
    backgroundColor: "#ffcd24",
    color: "#33393d",
  };
  const textDecor = {
    textDecoration: "none",
  };
  const { login, setLogin } = useContext(UserContext);
  return login ? (
    <Stack spacing={2} direction="row" className={style.newPostBtn}>
      <Link to="create" style={textDecor}>
        <Button variant="contained" style={styleBtn}>
          Новый пост
        </Button>
      </Link>
    </Stack>
  ) : null;
};
