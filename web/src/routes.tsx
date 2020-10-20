import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Message from "./pages/Message";
import PostContent from "./pages/PostContent";

function Routes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <AuthRoute exact path="/home" component={Home} />
        <AuthRoute exact path="/message" component={Message} />
        <AuthRoute exact path="/post-content" component={PostContent} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Routes;
