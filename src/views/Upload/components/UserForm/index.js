import React, { useState } from "react"
import OrganicForm from "../OrganicForm"
import LocalForm from "../LocalForm"
import ServingsForm from "../ServingsForm"
import Result from "../Result"
import { Paper } from "@material-ui/core"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    width: "100%",
  },
}))

function getSteps() {
  return ["Organic", "Local", "Servings"]
}

const UserForm = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const steps = getSteps()
  const [formState, setFormState] = useState({
    isOrganic: false,
    isLocal: false,
    servings: 1,
  })

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    setFormState({
      isOrganic: false,
      isLocal: false,
      servings: 1,
    })
  }

  const handleChange = input => e => {
    let value
    if (input === "isOrganic" || input === "isLocal") {
      value = e.target.value === "true"
    } else {
      value = e.target.value
    }
    setFormState({
      ...formState,
      [input]: value,
    })
  }

  const { isOrganic, isLocal, servings } = formState
  const values = { isOrganic, isLocal, servings }

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <OrganicForm
            handleNext={handleNext}
            handleChange={handleChange}
            values={values}
          />
        )
      case 1:
        return (
          <LocalForm
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={values}
          />
        )
      case 2:
        return (
          <ServingsForm
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={values}
          />
        )
      default:
        return <Result handleReset={handleReset} />
    }
  }

  const renderStepper = () => {
    if (activeStep < 3) {
      return (
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
      )
    }
  }

  return (
    <Paper elevation={3} className={classes.root}>
      {renderContent()}
      {renderStepper()}
    </Paper>
  )
}

export default UserForm
