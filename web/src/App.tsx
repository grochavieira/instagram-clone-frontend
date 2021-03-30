import React, { useState, useEffect } from "react";

import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/auth";
import { PostProvider } from "./contexts/post";
import "react-toastify/dist/ReactToastify.css";
import "./global.scss";

function App() {
  const { pathname } = window.location;
  return (
    <>
      <AuthProvider>
        <PostProvider>
          <Routes />
          <ToastContainer />
        </PostProvider>
      </AuthProvider>
    </>
  );
}

export default App;
