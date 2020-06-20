import React from "react"
import Dropzone from "../../components/dropzone"
import UserForm from "./components/UserForm"
import { makeStyles } from "@material-ui/styles"
import { Grid } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}))

const Upload = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={5} xs={12}>
          <Dropzone />
        </Grid>
        <Grid item md={7} xs={12}>
          <UserForm />
        </Grid>
      </Grid>
    </div>
  )
}

export default Upload
