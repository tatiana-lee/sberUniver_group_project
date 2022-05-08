import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Card as CardMUI } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { v4 as uuidv4 } from "uuid";
import * as dayjs from "dayjs";
import cn from "classnames";

import { useLocalStorage } from '../../hooks/useLocalStorage';
import ModalContext from "../../contexts/modalContext";
import styles from "./style.module.css";
import api from "../../utils/api.js";
import { POSTSONPAGE } from "../../utils/config";

import { Timeline } from "../Timeline";

export const PostCard = ({
  post,
  isInFavorite,
  setFavorite,
  user,
  setPage,
  tagSearch,
}) => {    
  const { writeLS, removeLS } = useLocalStorage();
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const { setModalState } = useContext(ModalContext);

  const addFavorite = () => {
    writeLS("favorite", post._id);
    setFavorite((prevState) => [...prevState, post._id]);
    api
      .addLike(post._id)
      .then((addedItem) => {
        setLikeCount((prevState) => prevState + 1);
        setModalState(() => {
          return {
            isOpen: true,
            msg: `"${addedItem.title}" добавлен в избраное`,
          };
        });
      })
      .catch(() => {
        setModalState(() => {
          return { isOpen: true, msg: `Не удалось добавить "${post.title}" в избранное` };
        });
      });
  };
  const removeFavorite = () => {
    removeLS("favorite", post._id);
    setFavorite((prevState) =>
      prevState?.filter((itemID) => post._id !== itemID)
    );
    api
      .removeLike(post._id)
      .then((removedItem) => {
        setLikeCount((prevState) => prevState - 1);
        setModalState(() => {
          return {
            isOpen: true,
            msg: `"${removedItem.title}" удален из избранного`,
          };
        });
      })
      .catch(() => {
        setModalState(() => {
          return {
            isOpen: true,
            msg: `Не удалось удалить из избранного`,
          };
        });
      });
  };

  const deletePost = () => {
    if (user?._id === post?.author._id) {
      api.deletePost(post._id).then((res) => {
        if (res.ok) {
          setPage(1);
          setModalState(() => {
            return {
              isOpen: true,
              msg: `"${post.title}" удален`,
            };
          });
        } else {
          return Promise.reject(`Ошибка : ${res.status}`);
        }
      });
    } else {
      setModalState(() => {
        return {
          isOpen: true,
          msg: `Вы не автор этого поста. Удаление невозвожно!`,
        };
      });
    }
  };


  require("dayjs/locale/ru");
  return (
    <CardMUI sx={{ maxWidth: 345 }} key={uuidv4()}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={post.author.avatar}
          />
        }
        action={
          user?._id === post?.author._id ? (
            <IconButton aria-label="settings" onClick={deletePost}>
              <DeleteForeverIcon />
            </IconButton>
          ) : null
        }
        title={
          <Link to={`/post/${post._id}`} className={cn(styles.headerTitle)}>
            {post.title}
          </Link>
        }
        subheader={dayjs(post.created_at).locale("ru").format("DD MMMM YYYY")}
      />
      <CardMedia
        component="img"
        height="200"
        image={post.image}
        alt={`${post.title} image`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" noWrap>
          {post.text}
        </Typography>
        <Typography>
          Tags:
          {post.tags.map((el) => {
            return (
              <Link to={`/search/tag_${el}`}
                key={uuidv4()}
              >
              <Button
                variant="outlined"
                size="small"
                sx={{ ml: "10px" }}
                onClick={()=>{
                  tagSearch(el);
                }}
                >
                {el}
              </Button>
                </Link>
            );
          })}
        </Typography>
      </CardContent>
      <Timeline
        createdAt={dayjs(post.created_at).locale("ru").format("DD-MM-YYYY")}
        updatedAt={dayjs(post.updated_at).locale("ru").format("DD-MM-YYYY")}
      />
      <CardActions disableSpacing>
        {isInFavorite ? (
          <IconButton
            aria-label="add to favorites"
            onClick={removeFavorite}
            color="error"
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton aria-label="add to favorites" onClick={addFavorite}>
            <FavoriteIcon />
          </IconButton>
        )}
        <Typography>{likeCount}</Typography>
      </CardActions>
    </CardMUI>
  );
};
