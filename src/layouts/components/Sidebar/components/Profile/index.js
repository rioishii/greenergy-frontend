import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
import { Auth } from "aws-amplify";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 70,
    height: 70,
    background: theme.palette.primary.main,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getUser();
    }
    return () => (isSubscribed = false);
  });

  async function getUser() {
    let user = await Auth.currentAuthenticatedUser();
    if (user) {
      setUserName(`${user.attributes.name} ${user.attributes.family_name}`);
    }
  }

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar alt="Person" className={classes.avatar} />
      <Typography className={classes.name} variant="h4">
        {userName}
      </Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
