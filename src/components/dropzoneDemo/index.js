import React, { useEffect, useState, useMemo } from "react"
import uploadIcon from "../../images/upload.png"
import axios from "axios"
import { useDropzone } from "react-dropzone"
import theme from "../../themes"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"

const useStyles = makeStyles(theme => ({
  paper: {
    height: "100%",
    width: "100%",
    textAlign: "center",
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  dropzone: {
    height: "300px",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  uploadIcon: {
    minWidth: "65px",
    minHeight: "65px",
  },
  button: {
    color: "#fff",
    width: "100%",
  },
}))

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "100px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  color: "#49535B",
  outline: "none",
  transition: "border .24s ease-in-out",
}

const activeStyle = {
  borderColor: "#2196f3",
}

const acceptStyle = {
  borderColor: "#8ED73D",
}

const rejectStyle = {
  borderColor: "#ff1744",
}

const thumbsContainer = {
  height: "300px",
  marginTop: theme.spacing(2),
}

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  width: 280,
  height: 280,
  padding: 4,
  boxSizing: "border-box",
}

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
}

const img = {
  display: "block",
  width: "auto",
  height: "100%",
}

const Dropzone = () => {
  const classes = useStyles()
  const [files, setFiles] = useState([])
  const [score, setScore] = useState("")
  const [carMiles, setCarMiles] = useState("")
  const [prediction, setPrediction] = useState("")
  const [probability, setProbability] = useState("")
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const reset = () => {
    setFiles([])
    setScore("")
    setPrediction("")
    setProbability("")
  }

  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals)
  }

  async function onImageSubmit() {
    const formData = new FormData()
    formData.append("image", files[0])

    try {
      const res = await axios.post(
        "http://3.17.14.113:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      if (res.data.success === true) {
        setScore(res.data.emissions)
        setCarMiles(round(res.data.emissions * 2.32, 2))
        setPrediction(res.data.prediction)
        setProbability(res.data.probability)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  )

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="food" />
      </div>
    </div>
  ))

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  const renderImage = () => {
    if (files === undefined || files.length === 0) {
      return (
        <div {...getRootProps({ style })} className={classes.dropzone}>
          <input {...getInputProps()} />
          <img src={uploadIcon} alt="upload" className={classes.uploadIcon} />
        </div>
      )
    } else {
      return <aside style={thumbsContainer}>{thumbs}</aside>
    }
  }

  const renderCard = () => {
    if (!score) {
      return (
        <Container>
          <Typography variant="h2" color="primary" align="center" gutterBottom>
            <strong>Drap and Drop!</strong>
          </Typography>
          <Typography variant="body1" color="textPrimary" gutterBottom>
            Submit your photo here to calculate how much your food emits!
          </Typography>
          {renderImage()}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onImageSubmit}
            disabled={files.length === 0 ? true : false}
          >
            Calculate
          </Button>
        </Container>
      )
    } else {
      return (
        <Container>
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            <strong>Score: {score}</strong>
          </Typography>
          <Typography variant="h5" color="primary" align="center" gutterBottom>
            <strong>
              About the same as driving {carMiles} miles in your car
            </strong>
          </Typography>
          <Typography variant="body1" color="primary">
            {probability} this is {prediction}
          </Typography>
          {renderImage()}
          <Typography variant="body1" align="center" gutterBottom>
            This score is based on Co2 Kilos per ~1 pound serving of food
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={reset}
          >
            Reset
          </Button>
        </Container>
      )
    }
  }

  return (
    <Paper elevation={3} className={classes.paper}>
      {renderCard()}
    </Paper>
  )
}

export default Dropzone
