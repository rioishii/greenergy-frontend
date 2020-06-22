import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Grid } from "@material-ui/core"
import UploadChart from "./components/UploadChart"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}))

export default function History() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <UploadChart />
        </Grid>
      </Grid>
    </div>
  )
}
