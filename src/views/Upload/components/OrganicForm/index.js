import React from "react"
import { Typography } from "@material-ui/core"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.neutral,
    height: "78%",
    display: "flex",
    justifyContent: "center",
  },
  inner: {
    textAlign: "center",
    paddingTop: theme.spacing(10),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(2)
  },
  questionText: {
    marginBottom: theme.spacing(4),
  },
  group: {
    justifyContent: "center",
  },
  button: {
    textAlign: "center",
    marginTop: theme.spacing(8),
  },
}))

const OrganicForm = props => {
  const classes = useStyles()

  const { values, handleChange, handleNext } = props

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.questionText}>
          <Typography variant="h1" color="primary" gutterBottom>
            <strong>Questions</strong>
          </Typography>
          <Typography variant="body1" color="textPrimary" gutterBottom>
            For more precise calculation, please answer these questions.
          </Typography>
        </div>

        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Typography variant="h1" color="secondary" gutterBottom>
              <strong>Is your food organic?</strong>
            </Typography>
          </FormLabel>
          <RadioGroup
            aria-label="isOrganic"
            name="isOrganic"
            value={String(values.isOrganic)}
            onChange={handleChange("isOrganic")}
            row
            className={classes.group}
          >
            <FormControlLabel
              value="true"
              control={
                <Radio
                  icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                  checkedIcon={<CheckBoxIcon fontSize="large" />}
                />
              }
              label="Yes"
              style={{ marginRight: "50px" }}
            />
            <FormControlLabel
              value="false"
              control={
                <Radio
                  icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                  checkedIcon={<CheckBoxIcon fontSize="large" />}
                />
              }
              label="No"
            />
          </RadioGroup>
          <div className={classes.button}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "250px" }}
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </FormControl>
      </div>
    </div>
  )
}

export default OrganicForm
