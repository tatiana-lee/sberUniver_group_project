import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@mui/material";
import ModalContext from "../../contexts/modalContext";
import api from "../../utils/api";
import "./index.css";

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
    <>
      <div className="addPost sectionInner">
        <form className="createpost">
          <Grid
            item
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            className="gridWrap"
          >
            <Grid item paddingBottom="20px">
              <Typography variant="h5">Редактировать пост</Typography>
            </Grid>
            <Grid item container className="formPost">
              <Grid item marginBottom="20px">
                <TextField
                  label="Заголовок"
                  name="title"
                  fullWidth
                  value={title}
                  variant="outlined"
                  required
                  onChange={({ target }) => {
                    setTitle(target.value);
                  }}
                />
              </Grid>
              <Grid item marginBottom="20px">
                <img src={`${image}`} className="postImg" />
              </Grid>
              <Grid item marginBottom="20px">
                <TextField
                  label="Фото"
                  fullWidth
                  name="text"
                  value={image}
                  variant="outlined"
                  onChange={({ target }) => {
                    setImage(target.value);
                  }}
                />
              </Grid>
              <Grid item marginBottom="20px">
                <TextField
                  label="Текст"
                  name="text"
                  value={text}
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={4}
                  onChange={({ target }) => {
                    setText(target.value);
                  }}
                />
              </Grid>

              <Grid item marginBottom="20px">
                <TextField
                  label="Теги"
                  name="text"
                  fullWidth
                  value={tags}
                  variant="outlined"
                  onChange={({ target }) => {
                    setTags(target.value.split(","));
                  }}
                />
              </Grid>
              <Grid item marginTop="20px">
                <Button
                  onClick={handleClick}
                  variant="contained"
                  color="primary"
                  size="small"
                  className="createBtn"
                >
                  Сохранить
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};
