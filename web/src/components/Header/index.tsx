import React, { useEffect, useState } from "react";

import NavigationMobile from "../NavigationMobile";
import HeaderDesktop from "../HeaderDesktop";

const Header = () => {
  const [windowWidth, setWindowWidth]: any = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return <>{windowWidth >= 530 ? <HeaderDesktop /> : <NavigationMobile />}</>;
};

export default Header;
