import React from "react"
import logo from "../../images/logo.png"
import Typography from "@material-ui/core/Typography"

function Logo(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <img src={logo} alt="logo" style={{ marginRight: "12px" }} />
      <Typography variant="h3" color="primary">
        <strong>{props.text}</strong>
      </Typography>
    </div>
  )
}

export default Logo
