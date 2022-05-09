import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@mui/material";
import ModalContext from "../../contexts/modalContext";
import api from "../../utils/api";
import { GoBackButton } from '../GoBackButton'

export const EditPost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const { setModalState } = useContext(ModalContext);

  const handleClick = (event) => {
    api
      .editPost(params.postID, {
        title,
        text,
        image,
        tags,
      })
      .then((data) => {
        setModalState(() => {
          return {
            isOpen: true,
            msg: `Изменения сохранены`,
          };
        });
        navigate("/");
      })
      .catch(() => {
        setModalState(() => {
          return {
            isOpen: true,
            msg: `Не удалось сохранить изменения`,
          };
        });
      });
  };

  useEffect(() => {
    api
      .getPosts(params.postID)
      .then((data) => {
        setTitle(data.title);
        setText(data.text);
        setImage(data.image);
        setTags(data.tags);
      })
      .catch((err) => {
        setModalState(() => {
          return {
            isOpen: true,
            msg: `${err}`,
          };
        });
      });
  }, []);

  return (
    <div className="addPost">
      <GoBackButton />
      <form>
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item paddingBottom="20px">
            <Typography variant="h5">Редактировать пост</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Заголовок"
              name="title"
              value={title}
              variant="outlined"
              required
              onChange={({ target }) => {
                setTitle(target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Текст"
              name="text"
              value={text}
              variant="outlined"
              required
              onChange={({ target }) => {
                setText(target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Фото"
              name="text"
              value={image}
              variant="outlined"
              onChange={({ target }) => {
                setImage(target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Теги"
              name="text"
              value={tags}
              variant="outlined"
              onChange={({ target }) => {
                setTags(target.value.split(","));
              }}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={handleClick}
              variant="contained"
              color="primary"
              size="small"
            >
              Сохранить
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
