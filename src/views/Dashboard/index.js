import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { DataStore } from "@aws-amplify/datastore";
import { FoodScore } from "../../models";
import { Auth, Hub } from "aws-amplify";

import {
  TotalUploaded,
  TotalEmission,
  AverageEmission,
  UploadTable,
} from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const [foodScores, updateFoodScores] = useState([]);
  const [currUser, setCurUser] = useState(null);

  useEffect(() => {
    checkAuth();
    Hub.listen("auth", checkAuth);
    return () => Hub.remove("auth", checkAuth);
  }, []);

  const checkAuth = async () => {
    try {
      let user = await Auth.currentAuthenticatedUser();
      setCurUser(user);
    } catch {
      setCurUser(null);
    }
  };

  useEffect(() => {
    fetchData();
    const subscription = DataStore.observe(FoodScore).subscribe(() =>
      fetchData()
    );
    return () => subscription.unsubscribe;
  });

  async function fetchData() {
    if (currUser) {
      const foodScores = await DataStore.query(FoodScore, (c) =>
        c.userID("eq", currUser.username)
      );
      updateFoodScores(foodScores);
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={4} xs={12}>
          <TotalUploaded foodScores={foodScores} />
        </Grid>
        <Grid item md={4} xs={12}>
          <AverageEmission foodScores={foodScores} />
        </Grid>
        <Grid item md={4} xs={12}>
          <TotalEmission foodScores={foodScores} />
        </Grid>
        <Grid item xs={12}>
          <UploadTable foodScores={foodScores} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
