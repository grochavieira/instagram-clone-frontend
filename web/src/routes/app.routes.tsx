import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoutes;
