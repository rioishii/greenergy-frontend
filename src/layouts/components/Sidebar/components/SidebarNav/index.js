import React, { useState, forwardRef, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { List, ListItem, Button, colors } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputIcon from "@material-ui/icons/Input";
import { Auth } from "aws-amplify";
import { AuthContext } from "../../../../../App"

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
  },
  button: {
    color: colors.blueGrey[800],
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  icon: {
    color: theme.palette.icon,
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
    backgroundColor: "#fafafa",
  },
}));

const CustomRouterNavLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <NavLink {...props} />
  </div>
));

const SidebarNav = (props) => {
  const { pages, className, ...rest } = props;

  const { dispatch } = useContext(AuthContext);

  const classes = useStyles();

  let history = useHistory();

  const [open, setOpen] = useState(false);

  const handleSignout = async (e) => {
    e.preventDefault();

    try {
      await Auth.signOut();
      dispatch({
        type: "LOGOUT",
      });
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
    <div>
      <List {...rest} className={clsx(classes.root, className)}>
        {pages.map((page) => (
          <ListItem className={classes.item} key={page.title}>
            <Button
              activeclassname={classes.active}
              className={classes.button}
              component={CustomRouterNavLink}
              to={page.href}
            >
              <div className={classes.icon}>{page.icon}</div>
              {page.title}
            </Button>
          </ListItem>
        ))}
        <ListItem className={classes.item}>
          <Button
            activeclassname={classes.active}
            className={classes.button}
            onClick={handleClickOpen}
          >
            <div className={classes.icon}>
              <InputIcon />
            </div>
            Logout
          </Button>
        </ListItem>
      </List>
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
    </div>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

export default SidebarNav;
