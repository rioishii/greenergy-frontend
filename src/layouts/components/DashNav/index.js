import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Hidden, IconButton, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuIcon from "@material-ui/icons/Menu";
import InputIcon from "@material-ui/icons/Input";
import Logo from "../../../components/Logo";
import { Auth } from "aws-amplify";
// import { AuthContext } from "../../../context";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    background: "#fff",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

const DashNav = (props) => {
  const { className, onSidebarOpen, ...rest } = props;

  // const { dispatch } = useContext(AuthContext);

  const classes = useStyles();

  let history = useHistory();

  const [open, setOpen] = useState(false);

  const handleSignout = async (e) => {
    e.preventDefault();

    try {
      await Auth.signOut();
      // dispatch({
      //   type: "LOGOUT",
      // });
      history.push("/login");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}>
        <Logo text="Greenergy" />
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="primary" onClick={handleClickOpen}>
            <InputIcon fontSize="large" />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="primary" onClick={onSidebarOpen}>
            <MenuIcon fontSize="large" />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout from Greenergy?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSignout} color="primary">
            Yes, logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default DashNav;
