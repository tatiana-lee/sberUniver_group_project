import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import ModalContext from "../../contexts/modalContext";
import PageContext from "../../contexts/PageContext";

export const DeleteButton = ({ setPostList }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { setModalState } = useContext(ModalContext);  
  const { setPage, setFlag } = useContext(PageContext);
  const handleClick = () => {
    api
      .deletePost(params.postID)
      .then((data) => {
        setModalState(() => {
          return {
            isOpen: true,
            msg: `Пост удален!`,
          };
        });
        api.getPosts().then((res) => setPostList(res));
        setPage(1);
        navigate("/");
        setFlag(true)
      })
      .catch((err) => {
        alert(err + " - Удаление чужого поста запрещено");
      });
  };

  return (
    <IconButton onClick={handleClick}>
      <DeleteIcon variant="outlined" />
    </IconButton>
  );
};
