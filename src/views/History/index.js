import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/styles"
import { Grid } from "@material-ui/core"
import { DataStore } from "@aws-amplify/datastore"
import { FoodScore } from "../../models"
import { UploadChart } from "../Dashboard/components"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}))

export default function History() {
  const classes = useStyles()

  const [foodScores, updateFoodScores] = useState([])

  useEffect(() => {
    fetchData()
    const subscription = DataStore.observe(FoodScore).subscribe(() =>
      fetchData()
    )
    return () => subscription.unsubscribe
  }, [])

  async function fetchData() {
    const foodScores = await DataStore.query(FoodScore)
    updateFoodScores(foodScores)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <UploadChart foodScores={foodScores} />
        </Grid>
      </Grid>
    </div>
  )
}
