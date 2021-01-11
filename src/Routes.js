import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Companies from "./Companies";
import Jobs from "./Jobs";
import Company from "./Company";
import Login from "./Login";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";

function Routes({setToken}) {
  return (
    <div className="pt-5">
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/login">
          <Login setToken={setToken} />
        </Route>

        <PrivateRoute
          exact
          path="/companies"
        >
          <Companies />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/jobs"
        >
          <Jobs />
        </PrivateRoute>

        <PrivateRoute
          path="/companies/:handle"
        >
          <Company />
        </PrivateRoute>

        <PrivateRoute
          path="/profile"
        >
          <Profile />
        </PrivateRoute>

      </Switch>
    </div>
  );
}

export default Routes;
