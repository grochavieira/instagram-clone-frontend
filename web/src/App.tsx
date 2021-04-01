import React from "react";

import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import "./global.scss";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes />
        <ToastContainer autoClose={3000} />
      </AuthProvider>
    </>
  );
}

export default App;
