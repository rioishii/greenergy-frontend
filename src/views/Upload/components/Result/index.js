import React from "react"
import { Typography, Grid } from "@material-ui/core"
import RefreshIcon from "@material-ui/icons/Refresh"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.neutral,
    height: "78%",
  },
  gridContainer: {
    padding: theme.spacing(3),
  },
  score: {
    height: "100px",
    width: "100px",
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
  backIcon: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(4),
    float: "right"
  },
}))

const Result = props => {
  const classes = useStyles()

  const { handleReset } = props

  return (
    <div className={classes.root}>
      <div className={classes.backIcon}>
        <IconButton onClick={handleReset}>
          <RefreshIcon fontSize="large" color="secondary" />
        </IconButton>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className={classes.button}
          startIcon={<SaveAltIcon />}
        >
          Save
        </Button>
      </div>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} sm={6}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h1" color="primary">
                Your Score:
              </Typography>
              <Avatar className={classes.score}>
                <Typography variant="h1" style={{ color: "#fff" }}>
                  69
                </Typography>
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h1" color="primary">
                Total Carbon Emitted:
              </Typography>
              <Typography
                variant="h1"
                color="secondary"
                style={{
                  marginTop: "32px",
                  marginLeft: "32px",
                  fontSize: "48px",
                }}
              >
                420.69g
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h1" color="primary" gutterBottom>
            Muffin
          </Typography>
          <Typography
            variant="h3"
            color="textSecondary"
            style={{ marginBottom: "4px" }}
          >
            Transportation
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            style={{ marginBottom: "4px" }}
          >
            Diesel: 124g
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            style={{ marginBottom: "4px" }}
          >
            Diesel: 80g
          </Typography>
          <Typography
            variant="h3"
            color="textSecondary"
            style={{ marginBottom: "4px" }}
          >
            Electric Production
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            style={{ marginBottom: "4px" }}
          >
            Natural Gas: 72g
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            style={{ marginBottom: "4px" }}
          >
            Coal: 89g
          </Typography>
          <Typography
            variant="h3"
            color="textSecondary"
            style={{ marginBottom: "4px" }}
          >
            Non-Energy Sources
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            style={{ marginBottom: "4px" }}
          >
            Enteric Fermentation: 20g
          </Typography>
          <Typography
            variant="h3"
            color="textPrimary"
            style={{ marginBottom: "4px" }}
          >
            Manure: 50g
          </Typography>
          <Typography variant="h3" color="textPrimary">
            Other 64.g
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Result
