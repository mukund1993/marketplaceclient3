import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import Layout from "./Layout";
import Error from "../pages/error";

import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import Otp from "../pages/otp";
import { useUserState } from "../context/UserContext";


export default function App() {
  var { isAuthenticated } = useUserState();
  return (
    <HashRouter>
      <Switch>
        {/* <Route exact path="/" render={() => <Redirect to="/login" />} />
        <PublicRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={Register} />
        <PublicRoute path="/otp" component={Otp} />
        <PrivateRoute  path="/dashboard" component={Dashboard} /> */}
        <Route component={Dashboard} />
      </Switch>
    </HashRouter>
  );

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/dashboard",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }
  
}
