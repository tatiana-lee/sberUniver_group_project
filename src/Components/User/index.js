import React, { useContext, useEffect, useState } from "react";
import { Link as LinkRoute } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

import { Grid, Typography, Button } from "@mui/material";

export const User = () => {
  const { user } = useContext(UserContext);

  const [userName, setUserName] = useState("");
  const [userAbout, setUserAbout] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    user && setUserName(user.name);
    user && setUserAbout(user.about);
    user && setUserAvatar(user.avatar);
  }, [user]);

  return (
    <Grid container flexDirection="column" spacing="10">
      <Grid item>
        <Typography variant="h3">Ваш профиль </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h3">{userName} </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h3">{userAbout} </Typography>
      </Grid>
      <Grid item>
        <img src={`${userAvatar}`} alt={user?.name} />
      </Grid>
      <Grid item>
        <LinkRoute to={"edit"}>
          <Button variant="contained" color="secondary" size="small">
            Редактировать
          </Button>
        </LinkRoute>
      </Grid>
    </Grid>
  );
};
