import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./views/Landingpage";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Dashboard from "./views/Dashboard";
import Upload from "./views/Upload";
import History from "./views/History";
import Main from "./layouts";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Chart } from "react-chartjs-2";
import "./assets/scss/index.scss";
import validate from "validate.js";
import validators from "./utility/validators";
import chartjs from "./utility/chartjs";
import theme from "./themes";

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw,
});

validate.validators = {
  ...validate.validators,
  ...validators,
};

const App = () => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/app/dashboard">
          <Main>
            <Dashboard />
          </Main>
        </Route>
        <Route path="/app/upload">
          <Main>
            <Upload />
          </Main>
        </Route>
        <Route path="/app/history">
          <Main>
            <History />
          </Main>
        </Route>
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;
