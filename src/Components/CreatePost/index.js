import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@mui/material";
import api from "../../utils/api";
import "./index.css";
import { GoBackButton } from '../GoBackButton'

export const CreatePost = ({ setPostsState }) => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      target: { title, text, image, tags },
    } = event;
    api
      .addPosts({
        title: title.value.trim(),
        text: text.value.trim(),
        image: image.value.trim(),
        tags: tags.value.trim().split(","),
      })
      .then(
        api
          .getPosts()
          .then((data) => {
            setPostsState(data);
            setModalState(() => {
              return {
                isOpen: true,
                msg: `Пост успешно добавлен`,
              };
            });
            navigate("/");
          })
          .catch((err) => {
            setModalState(() => {
              return {
                isOpen: true,
                msg: `Не удалось добавить`,
              };
            });
          })
      )
      .catch((err) => {
        setModalState(() => {
          return {
            isOpen: true,
            msg: `Не удалось добавить`,
          };
        });
      });
  };

  return (
    <div className="addPost">
      <GoBackButton />
      <form className="createpost" onSubmit={handleSubmit}>
        <Grid
          item
          container
          xs={12}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item paddingBottom="20px">
            <Typography variant="h5">Создать новый пост</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Заголовок"
              name="title"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <TextField
              label="Текст"
              name="text"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <TextField label="Фото" name="image" variant="outlined" fullWidth />
          </Grid>
          <Grid item>
            <TextField
              label="Теги введите через запятую"
              name="tags"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item marginTop="20px">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              создать
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
