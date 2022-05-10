import * as React from "react";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import style from "./style.module.css";

export const GoBackButton = () => {
  const styleBtn = {
    backgroundColor: "#ffcd24",
    color: "#33393d",
  };
  const textDecor = {
    textDecoration: "none",
  };
  return (
    <Link className={style.backBtn} to="/" style={textDecor}>
      <Button variant="contained" style={styleBtn}>
        <ArrowBackIosIcon />
        Назад
      </Button>
    </Link>
  );
};
