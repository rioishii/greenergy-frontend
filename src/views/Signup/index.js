import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom";
import validate from "validate.js"
import { makeStyles } from "@material-ui/styles"
import {
  Grid,
  Button,
  IconButton,
  Link as MLink,
  TextField,
  FormHelperText,
  Checkbox,
  Typography,
  Paper,
} from "@material-ui/core"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import signupImg from "../../images/signup.png"
import { Auth } from "aws-amplify"

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  lastName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
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
  policy: {
    presence: { allowEmpty: false, message: "is required" },
    checked: true,
  },
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
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
  },
  imgInner: {
    flexBasis: "600px",
  },
  imgText: {
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(8),
    marginBottom: theme.spacing(4),
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
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 0,
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
  verify: {
    paddingLeft: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {},
  textField: {
    marginTop: theme.spacing(3),
  },
  policy: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  policyCheckbox: {
    marginLeft: "-14px",
  },
  signUpButton: {
    margin: theme.spacing(2, 0),
  },
  link: {
    color: "#6CAE75",
    "&:hover, &:focus": {
      textDecoration: "underline",
      textDecorationColor: "#6CAE75",
    },
  },
}))

const Signup = () => {
  const classes = useStyles()

  let history = useHistory();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  })

  const [pageState, setPageState] = useState("signup")

  const [cognitoErr, setCognitoErr] = useState("")

  useEffect(() => {
    const errors = validate(formState.values, schema)

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }))
  }, [formState.values])

  const handleChange = event => {
    event.persist()

    setFormState(formState => ({
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
    }))
  }

  const handleBack = () => {
    history.push('/')
  }

  const handleToLogin = () => {
    history.push('/login')
  }

  const handleVerifyBack = () => {
    setPageState("signup")
  }

  const handleSignUp = async event => {
    event.preventDefault()
    setCognitoErr("")

    try {
      await Auth.signUp({
        username: formState.values.email,
        password: formState.values.password,
        attributes: {
          name: formState.values.firstName,
          family_name: formState.values.lastName,
        },
      })
      setPageState("verify")
    } catch (error) {
      let err = error.message
      setCognitoErr(err)
      console.log("error signing up:", error)
    }
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false

  const renderContent = () => {
    if (pageState === "signup") {
      return (
        <Grid
          className={classes.content}
          item
          lg={8}
          xs={12}
          component={Paper}
          elevation={6}
          square
        >
          <div className={classes.contentHeader}>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
          </div>
          <div className={classes.contentBody}>
            <form className={classes.form} onSubmit={handleSignUp}>
              <Typography variant="h2" color="primary">
                Create new account
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Use your email to create new account
              </Typography>
              {cognitoErr && (
                <Typography
                  variant="body1"
                  style={{ color: "#F32013", marginTop: "12px" }}
                >
                  {cognitoErr}
                </Typography>
              )}
              <TextField
                className={classes.textField}
                error={hasError("firstName")}
                fullWidth
                helperText={
                  hasError("firstName") ? formState.errors.firstName[0] : null
                }
                label="First name"
                name="firstName"
                onChange={handleChange}
                type="text"
                value={formState.values.firstName || ""}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                error={hasError("lastName")}
                fullWidth
                helperText={
                  hasError("lastName") ? formState.errors.lastName[0] : null
                }
                label="Last name"
                name="lastName"
                onChange={handleChange}
                type="text"
                value={formState.values.lastName || ""}
                variant="outlined"
              />
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
              <div className={classes.policy}>
                <Checkbox
                  checked={formState.values.policy || false}
                  className={classes.policyCheckbox}
                  color="primary"
                  name="policy"
                  onChange={handleChange}
                />
                <Typography
                  className={classes.policyText}
                  color="textPrimary"
                  variant="body1"
                >
                  I have read the{" "}
                  <MLink color="primary" to="#" underline="always" variant="h6">
                    Terms and Conditions
                  </MLink>
                </Typography>
              </div>
              {hasError("policy") && (
                <FormHelperText error>
                  {formState.errors.policy[0]}
                </FormHelperText>
              )}
              <Button
                className={classes.signUpButton}
                color="primary"
                disabled={!formState.isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign up now
              </Button>
              <Typography variant="body1">
                <Link to="/login" className={classes.NavLink}>
                  Have an account? Sign in
                </Link>
              </Typography>
            </form>
          </div>
        </Grid>
      )
    } else {
      return (
        <Grid
          className={classes.content}
          item
          lg={8}
          xs={12}
          component={Paper}
          elevation={6}
          square
        >
          <div className={classes.contentHeader}>
            <IconButton onClick={handleVerifyBack}>
              <ArrowBackIcon />
            </IconButton>
          </div>
          <div className={classes.contentBody}>
            <div className={classes.verify}>
              <Typography variant="h2" color="primary" gutterBottom>
                Verify Email
              </Typography>
              <Typography color="textPrimary" variant="body1" gutterBottom>
                Thank you for registering! We have sent you an email with a link
                to verify your account. Please click the link in that email and
                sign in to continue.
              </Typography>

              <Button
                className={classes.signUpButton}
                color="primary"
                size="large"
                variant="contained"
                onClick={handleToLogin}
              >
                Sign in
              </Button>
            </div>
          </div>
        </Grid>
      )
    }
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.imgContainer} item lg={4}>
          <div className={classes.img}>
            <div className={classes.imgInner}>
              <div className={classes.imgText}>
                <Typography variant="h1" color="textSecondary" gutterBottom>
                  Discover how your food contributes to your carbon footprint.
                </Typography>
              </div>
              <div className={classes.imgText}>
                <img src={signupImg} alt="icon" />
              </div>
            </div>
          </div>
        </Grid>

        {renderContent()}
      </Grid>
    </div>
  )
}

export default Signup
