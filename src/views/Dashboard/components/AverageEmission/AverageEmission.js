import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/styles"
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core"
import FastfoodIcon from "@material-ui/icons/Fastfood"

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
}))

const AverageEmission = props => {
  const { className, foodScores, ...rest } = props

  const classes = useStyles()

  let average = calcAverage()

  function calcAverage() {
    if (foodScores.length === 0) {
      return 0
    }
    let sum = foodScores.reduce(function(s, a) {
      return s + a.score
    }, 0)

    let average = sum / foodScores.length
    return average.toFixed(3)
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body1"
            >
              Average Score per Meal
            </Typography>
            <Typography variant="h3" display="inline">
              {average}{" "}
            </Typography>
            <Typography
              variant="body2"
              display="inline"
              style={{ color: "#424242" }}
            >
              Co2 kg per ~1lb of serving
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <FastfoodIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AverageEmission
