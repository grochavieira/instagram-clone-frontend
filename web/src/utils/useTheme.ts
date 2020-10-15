import { useEffect } from "react";

const themes: any = {
  light: {
    "--color-primary": "#fff",
    "--color-secondary": "#fafafa",
    "--color-tertiary": "rgb(0, 149, 247)",
    "--color-tertiary-dark": "rgb(6, 130, 212)",
    "--color-tertiary-dark2": "rgb(7, 75, 121)",
    "--color-tertiary-light": "rgba(3, 140, 231, 0.774)",
    "--color-highlight": "#333",
    "--color-text": "#888",
    "--color-border": "#ddd",
    "--color-shimer-primary": "#fff",
    "--color-shimer-secondary": "#ecebeb",
    "background-color": "var(--color-secondary)",
    color: "#333",
  },
  dark: {
    "--color-primary": "#151515",
    "--color-secondary": "#101010",
    "--color-tertiary": "rgb(0, 149, 247)",
    "--color-tertiary-dark": "rgb(6, 130, 212)",
    "--color-tertiary-dark2": "rgb(7, 75, 121)",
    "--color-tertiary-light": "rgba(3, 140, 231, 0.774)",
    "--color-highlight": "#fff",
    "--color-text": "#eee",
    "--color-border": "#222",
    "--color-shimer-primary": "#000",
    "--color-shimer-secondary": "#090909",
    "background-color": "var(--color-secondary)",
    color: "#fff",
  },
};

const useTheme = (selectedTheme: string) => {
  useEffect(() => {
    // const themeType = localStorage.getItem("themeType");
    // console.log(themeType);
    // let theme: any;
    // if (themeType) {
    //   const chosenTheme = JSON.parse(themeType);
    //   theme = themes[chosenTheme];
    // } else {
    const theme = themes[selectedTheme] || themes.light;

    Object.keys(theme).forEach((key) => {
      const value = theme[key];
      document.documentElement.style.setProperty(key, value);
    });
    localStorage.setItem("themeType", JSON.stringify(selectedTheme));
  }, [selectedTheme]);
};

export default useTheme;
