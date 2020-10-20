import React, { useState, useEffect } from "react";
import Routes from "./routes";

import { AuthProvider } from "./context/auth";
import "./global.scss";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}

export default App;
