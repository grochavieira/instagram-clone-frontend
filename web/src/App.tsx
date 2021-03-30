import React from "react";

import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthProvider";
import { PostProvider } from "./contexts/PostProvider";
import "react-toastify/dist/ReactToastify.css";
import "./global.scss";

function App() {
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
