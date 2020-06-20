import React from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: "#49535B",
    padding: theme.spacing(4),
  },
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Typography variant="body2" align="center" color="primary">
        © 2020 Emission Impossible, Inc. All rights reserved
      </Typography>
    </footer>
  )
}

export default Footer
