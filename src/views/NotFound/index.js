import React from "react"
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles"
import { Grid, Typography } from "@material-ui/core"
import notFound from "../images/notFound.png"
import theme from "../../themes"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    paddingTop: 50,
    textAlign: "center",
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: 500,
    height: "auto",
  },
}))

const NotFound = () => {
  const classes = useStyles()

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid container justify="center" spacing={4}>
          <Grid item lg={6} xs={12}>
            <div className={classes.content}>
              <Typography variant="h1">
                404: The page you are looking for isn’t here
              </Typography>
              <Typography variant="subtitle2">
                You either tried some shady route or you came here by mistake.
                Whichever it is, try using the navigation
              </Typography>
              <img
                alt="Under development"
                className={classes.image}
                src={notFound}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  )
}

export default NotFound
