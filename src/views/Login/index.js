import React, { useState, useEffect, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import loginImg from "../../images/login.png";
import { Auth } from "aws-amplify";
import { AuthContext } from "../../App";
import { DataStore } from "@aws-amplify/datastore";
import { FoodScore } from "../../models";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  grid: {
    height: "100%",
  },
  imgContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  img: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imgInner: {
    textAlign: "center",
    flexBasis: "600px",
  },
  imgText: {
    marginTop: theme.spacing(2),
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  signInButton: {
    marginBottom: theme.spacing(2),
  },
  NavLink: {
    color: "#6CAE75",
    "&:hover, &:focus": {
      textDecoration: "underline",
      textDecorationColor: "#6CAE75",
    },
  },
}));

const Login = () => {
  const classes = useStyles();

  const { dispatch } = useContext(AuthContext);

  let history = useHistory();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const [cognitoErr, setCognitoErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleBack = () => {
    history.push("/");
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setCognitoErr("");
    try {
      const user = await Auth.signIn(
        formState.values.email,
        formState.values.password
      );
      const foodScores = await DataStore.query(FoodScore, (c) =>
        c.userID("eq", user.username)
      );
      dispatch({
        type: "LOGIN",
        payload: { user, foodScores },
      });
      history.push("/app/dashboard");
    } catch (error) {
      let err = error.message;
      setCognitoErr(err);
      console.log("error signing up:", error);
    }
    setIsLoading(false);
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid
          className={classes.content}
          item
          lg={5}
          xs={12}
          component={Paper}
          elevation={6}
          square
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignIn}>
                <div className={classes.title}>
                  <Typography variant="h2" color="primary">
                    Sign in
                  </Typography>
                  {cognitoErr && (
                    <Typography
                      variant="body1"
                      style={{ color: "#F32013", marginTop: "12px" }}
                    >
                      {cognitoErr}
                    </Typography>
                  )}
                </div>

                <TextField
                  className={classes.textField}
                  error={hasError("email")}
                  fullWidth
                  helperText={
                    hasError("email") ? formState.errors.email[0] : null
                  }
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("password")}
                  fullWidth
                  helperText={
                    hasError("password") ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ""}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                </Button>
                {isLoading ? (
                  <LinearProgress style={{ marginBottom: "25px" }} />
                ) : (
                  ""
                )}
                <Typography variant="body1">
                  <NavLink to="/signup" className={classes.NavLink}>
                    Don't have an account? Sign up
                  </NavLink>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>

        <Grid className={classes.imgContainer} item lg={7}>
          <div className={classes.img}>
            <div className={classes.imgInner}>
              <img src={loginImg} width="550px" alt="icon" />
              <div className={classes.imgText}>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Did you know?
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
