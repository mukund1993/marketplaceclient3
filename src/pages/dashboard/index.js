import React from "react";
import {
  Grid
} from "@material-ui/core";
import useStyles from "./styles";

import PageTitle from "../../components/PageTitle";
import Header from '../../components/Header'
import AddProfile from './components/AddProfile'
import { useUserDispatch, updateProfile } from "../../context/UserContext";

export default function Dashboard(props) {
  var classes = useStyles();
  const userDispatch = useUserDispatch();

  const addProfile = (profile) => {
    console.log(profile)
    updateProfile(
      userDispatch,
      profile
    )
  }

  return (
    <>
      <Header />
      <Grid item xs={12} md={12} className={classes.dashboardContainer}>
        <AddProfile addProfile={addProfile}/>
      </Grid>
    </>
  );
}
