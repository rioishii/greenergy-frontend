import React, { useEffect, useReducer, createContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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
import { DataStore } from "@aws-amplify/datastore";
import { FoodScore } from "./models";

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw,
});

validate.validators = {
  ...validate.validators,
  ...validators,
};

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  foodScores: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        foodScores: action.payload.foodScores,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        foodScores: null,
      };
    case "FETCH":
      return {
        ...state,
        foodScores: action.payload.foodScores,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData();
    const subscription = DataStore.observe(FoodScore).subscribe(() =>
      fetchData()
    );
    return () => subscription.unsubscribe;
  });

  async function fetchData() {
    if (state.isAuthenticated && state.user) {
      const foodScores = await DataStore.query(FoodScore, (c) =>
        c.userID("eq", state.user.username)
      );
      dispatch({
        type: "FETCH",
        payload: { foodScores },
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
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
              {state.isAuthenticated ? (
                <Main>
                  <Dashboard />
                </Main>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/app/upload">
              {state.isAuthenticated ? (
                <Main>
                  <Upload />
                </Main>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/app/history">
              {state.isAuthenticated ? (
                <Main>
                  <History />
                </Main>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </AuthContext.Provider>
  );
};

export default App;
