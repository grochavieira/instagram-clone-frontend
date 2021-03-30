import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Header from "../components/Header";
import Home from "../pages/Home";
import PostContent from "../pages/PostContent";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Message from "../pages/Message";
import Page404 from "../pages/Page404";
import PostDetails from "../pages/PostDetails";

const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/message" component={Message} />
        <Route exact path="/post-content" component={PostContent} />
        <Route exact path="/post/:postId" component={PostDetails} />
        <Route exact path="/profile/:username" component={Profile} />
        <Route exact path="/404" component={Page404} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
};

export default AuthRoutes;
