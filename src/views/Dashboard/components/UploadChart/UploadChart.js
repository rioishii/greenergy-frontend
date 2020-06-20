// import React from "react"

// import PropTypes from "prop-types"
// import { Line } from "react-chartjs-2"

// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
// import ArrowRightIcon from "@material-ui/icons/ArrowRight"
// import palette from "../../../../themes/palette"
// import { options } from "./chart"

// const UploadChart = props => {
//   const { className, foodScores, ...rest } = props

// UploadChart.propTypes = {
//   className: PropTypes.string,
// }

// export default UploadChart

import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/styles"
import { Card, CardContent } from "@material-ui/core"
import palette from "../../../../themes/palette"
import { Line } from "react-chartjs-2"
import { options } from "./chart"

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: "100%",
    position: "relative",
  },
  actions: {
    justifyContent: "flex-end",
  },
}))

const UploadChart = props => {
  const { className, foodScores, ...rest } = props

  const classes = useStyles()

  let foodLabels = foodScores.map(item => item.createdAt)
  let scores = foodScores.map(item => item.score)
  let foodNames = foodScores.map(item => item.name)
  let miles = foodScores.map(item => item.carMiles)

  const data = {
    labels: foodLabels,
    datasets: [
      {
        label: "Score (Co2 kg per 1lb serving)",
        borderColor: palette.secondary.main,
        fill: false,
        data: scores,
        data1: foodNames,
      },
      {
        label: "Car Miles",
        backgroundColor: "rgba(108, 174, 117, 0.2)",
        borderColor: palette.primary.main,
        fill: true,
        data: miles,
      },
    ],
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.chartContainer}>
          <Line data={data} options={options}/>
        </div>
      </CardContent>
    </Card>
  )
}

export default UploadChart
