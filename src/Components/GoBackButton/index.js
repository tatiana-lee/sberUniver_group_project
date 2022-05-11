import React ,{useContext} from "react";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import PageContext from "../../contexts/PageContext";
export const GoBackButton = () => {    
  const { page, setPage, update, setFlag } = useContext(PageContext);
  const styleBtn = {
    backgroundColor: "#ffcd24",
    color: "#33393d",
  };
  const textDecor = {
    textDecoration: "none",
  };

  const history = useNavigate()
  return (
      <Button variant="contained" style={styleBtn} onClick={()=>{history(-1), setFlag(true)}}>
        <ArrowBackIosIcon />
        Назад
      </Button>
  );
};
