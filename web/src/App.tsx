import React, { useState, useEffect } from "react";
import Routes from "./routes";
import ThemeSwitcher from "./components/ThemeSwitcher";

import "./global.scss";

function App() {
  return (
    <>
      <ThemeSwitcher />
      <Routes />
    </>
  );
}

export default App;
