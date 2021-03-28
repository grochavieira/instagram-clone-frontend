import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import PostContent from "../pages/PostContent";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

import Header from "../components/Header";
import Message from "../pages/Message";

const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/message" component={Message} />
        <Route exact path="/post-content" component={PostContent} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default AuthRoutes;
