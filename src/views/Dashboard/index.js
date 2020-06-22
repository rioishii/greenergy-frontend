import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

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

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={4} xs={12}>
          <TotalUploaded />
        </Grid>
        <Grid item md={4} xs={12}>
          <AverageEmission />
        </Grid>
        <Grid item md={4} xs={12}>
          <TotalEmission />
        </Grid>
        <Grid item xs={12}>
          <UploadTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
