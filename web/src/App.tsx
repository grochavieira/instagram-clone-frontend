import React, { useState, useEffect } from "react";

import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/auth";
import "react-toastify/dist/ReactToastify.css";
import "./global.scss";

function App() {
  const { pathname } = window.location;
  return (
    <>
      <AuthProvider>
        <Routes />
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
