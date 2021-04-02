import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { SocketProvider } from "../contexts/SocketProvider";
import AuthContext from "../contexts/AuthProvider";
import Header from "../components/Header";
import Home from "../pages/Home";
import PostContent from "../pages/PostContent";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
// import Message from "../pages/Message";
import Page404 from "../pages/Page404";
import PostDetails from "../pages/PostDetails";
import Activity from "../pages/Activity";
import Search from "../pages/Search";
import Splash from "../pages/Splash";

const AuthRoutes = () => {
  const { user } = useContext<any>(AuthContext);
  return (
    <SocketProvider id={user.username}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Splash} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/register" component={Register} />
          {/* <Route exact path="/message" component={Message} /> */}
          <Route exact path="/post-content" component={PostContent} />
          <Route exact path="/post/:postId" component={PostDetails} />
          <Route exact path="/profile/:username" component={Profile} />
          <Route exact path="/activity" component={Activity} />
          <Route exact path="/search" component={Search} />
          {/* <Route exact path="/404" component={Page404} /> */}
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </SocketProvider>
  );
};

export default AuthRoutes;
