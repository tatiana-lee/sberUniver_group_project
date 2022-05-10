import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import style from "./style.module.css";
import PersonIcon from "@mui/icons-material/Person";

import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { Link } from "@mui/material";
import { Link as LinkRoute } from "react-router-dom";
import api from "../../utils/api";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import UserContext from "../../contexts/UserContext.js";

export default function Info({ user, setPostsState, setFavorite }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { login, setLogin } = useContext(UserContext);

  const { writeLS, removeLS } = useLocalStorage();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const myFavorite = () => {
    api
      .getPosts()
      .then((data_posts) => {
        api
          .getMeInfo()
          .then((data_user) => {
            let myFavorite = [];
            data_posts.forEach((el) => {
              el.likes.forEach((likesOnPost) => {
                if (likesOnPost === data_user._id) {
                  setFavorite((prevState) => [...prevState, el._id]);
                  writeLS("favorite", el._id);
                  myFavorite.push(el);
                }
              });
            });
            setPostsState(myFavorite);
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const myPosts = () => {
    api
      .getPosts()
      .then((data_posts) => {
        api
          .getMeInfo()
          .then((data_user) => {
            let myPosts = [];
            data_posts.forEach((el) => {
              if (el.author._id === data_user._id) {
                myPosts.push(el);
              }
            });
            setPostsState(myPosts);
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const logoutFunc = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("userID", "");
    setLogin(false);
  };

  return login ? (
    <React.Fragment>
      <Box
        className={style.wrap}
        sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
      >
        <Link
          href="https://github.com/sopel1996/sberUniver_group_project"
          sx={{ mr: "10px" }}
        >
          <IconButton className={style.headerBtns} aria-label="GitHub">
            <GitHubIcon />
          </IconButton>
        </Link>

        <Tooltip title="Мои посты">
          <LinkRoute to={`/post/my_posts`}>
            <IconButton
              className={style.headerBtns}
              onClick={() => myPosts()}
              size="small"
              sx={{ ml: 2 }}
            >
              <SnippetFolderIcon />
            </IconButton>
          </LinkRoute>
        </Tooltip>

        <Tooltip title="Избранные посты">
          <LinkRoute to={`/post/my_favorite`}>
            <IconButton
              className={style.headerBtns}
              onClick={() => myFavorite()}
              size="small"
              sx={{ ml: 2 }}
            >
              <FavoriteIcon />
            </IconButton>
          </LinkRoute>
        </Tooltip>

        <Tooltip title="Аккаунт">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} className={style.headerBtns}>
              {user?.name.slice(0, 1)}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem className={style.userName}>
          <Avatar />
          <div>{user?.name}</div>
        </MenuItem>
        <Divider />
        <MenuItem>
          <LinkRoute to={"user"} className={style.link}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Аккаунт
          </LinkRoute>
        </MenuItem>
        <MenuItem onClick={logoutFunc}>
          <LinkRoute to={"/"} className={style.link}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Выйти
          </LinkRoute>
        </MenuItem>
      </Menu>
    </React.Fragment>
  ) : (
    <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
      <Link
        href="https://github.com/sopel1996/sberUniver_group_project"
        sx={{ mr: "10px" }}
      >
        <IconButton aria-label="GitHub">
          <GitHubIcon />
        </IconButton>
      </Link>
    </Box>
  );
}
