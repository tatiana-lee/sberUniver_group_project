import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@mui/material";
import api from "../../utils/api";
import "./index.css";
import placeholder from "../../../public/assets/placeholder.png";
import ModalContext from "../../contexts/modalContext";
export const CreatePost = ({ setPostsState }) => {
  const navigate = useNavigate();
  const [postImg, setPostImg] = useState("");
  const { setModalState } = useContext(ModalContext);
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
    <div className="addPost sectionInner">
      <form className="createpost" onSubmit={handleSubmit}>
        <Grid
          item
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          className="gridWrap"
        >
          <Grid item container className="formPost">
            <Grid item paddingBottom="20px">
              <Typography variant="h5">Создать новый пост</Typography>
            </Grid>
            <Grid item marginBottom="20px">
              <TextField
                label="Заголовок"
                name="title"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item marginBottom="20px">
              <img src={`${postImg || placeholder}`} className="postImg" />
            </Grid>
            <Grid item marginBottom="20px">
              <TextField
                label="Фото"
                name="image"
                variant="outlined"
                fullWidth
                value={postImg}
                onChange={({ target }) => {
                  setPostImg(target.value);
                }}
              />
            </Grid>
            <Grid item marginBottom="20px">
              <TextField
                label="Текст"
                name="text"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>

            <Grid item marginBottom="20px">
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
                className="createBtn"
              >
                создать
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
