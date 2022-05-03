// import React from "react";
import React, { useEffect, useState } from "react";
import { Card as CardMUI } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import * as dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
import { Timeline } from "../Timeline";
import api from "../../utils/api.js";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const PostCard = ({
  post,
  isInFavorite,
  setFavorite,
  user,
  setUpdateAfterDelete,
  setPage,
}) => {
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const writeLS = (key, value) => {
    const storage = JSON.parse(localStorage.getItem(key)) || [];
    storage.push(value);
    localStorage.setItem(key, JSON.stringify(storage));
  };

  const removeLS = (key, value) => {
    const storage = JSON.parse(localStorage.getItem(key));
    const filteredStorage = storage.filter((itemID) => value !== itemID);
    localStorage.setItem(key, JSON.stringify(filteredStorage));
  };

  const addFavorite = () => {
    writeLS("favorite", post._id);
    setFavorite((prevState) => [...prevState, post._id]);
    api
      .addLike(post._id)
      .then((addedItem) => {
        setLikeCount((prevState) => prevState + 1);
        alert(`${addedItem.title} добавлен в избранные`);
      })
      .catch(() => {
        alert(`Не удалось добавить в избранные`);
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
        alert(`${removedItem.title} удален из избранного`);
      })
      .catch(() => {
        alert(`Не удалось удалить из избранного`);
      });
  };

  const deletePost = () => {
    if (user?._id === post?.author._id) {
      api.deletePost(post._id).then((res) => {
        if (res.ok) {
          alert("пост удален");
          setPage(1);
          return setUpdateAfterDelete(true);
        } else {
          return Promise.reject(`Ошибка : ${res.status}`);
        }
      });
    } else {
      alert("Вы не автор этого поста. Удаление невозвожно!");
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
        title={<Link to={`/post/${post._id}`}>{post.title}</Link>}
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
              <Button
                variant="outlined"
                size="small"
                sx={{ ml: "10px" }}
                key={uuidv4()}
              >
                {el}
              </Button>
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
