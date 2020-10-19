import React, { useState, useEffect } from "react";
import Routes from "./routes";
import ThemeSwitcher from "./components/ThemeSwitcher";

import { AuthProvider } from "./context/auth";
import "./global.scss";

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeSwitcher />
        <Routes />
      </AuthProvider>
    </>
  );
}

export default App;
