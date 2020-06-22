import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent } from "@material-ui/core";
import palette from "../../../../themes/palette";
import { Line } from "react-chartjs-2";
import { options } from "./chart";
import { AuthContext } from "../../../../App";

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: "100%",
    position: "relative",
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const UploadChart = (props) => {
  const { className, ...rest } = props;

  const { state } = useContext(AuthContext);

  const classes = useStyles();

  let foodLabels = state.foodScores.map((item) => item.createdAt);
  let scores = state.foodScores.map((item) => item.score);
  let foodNames = state.foodScores.map((item) => item.name);
  let miles = state.foodScores.map((item) => item.carMiles);

  const data = {
    labels: foodLabels,
    datasets: [
      {
        label: "Score (Co2 kg per 1lb serving)",
        borderColor: palette.secondary.main,
        fill: false,
        data: scores,
        data1: foodNames,
      },
      {
        label: "Car Miles",
        backgroundColor: "rgba(108, 174, 117, 0.2)",
        borderColor: palette.primary.main,
        fill: true,
        data: miles,
      },
    ],
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.chartContainer}>
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadChart;
