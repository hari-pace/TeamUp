import { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeContextProvider(props) {
  const [isLightTheme, setIsLightTheme] = useState([true]);

  const [light, setLight] = useState({
    text: "var(--tertiary)",
    ui: "var(--primary)",
    bg: "var(--primary)",
    grey: "var(--secondary)",
    navbar: "#93A5CA",
  });

  const [dark, setDark] = useState({
    text: "#DDD",
    ui: "#333",
    bg: "#DDD",
    grey: "#555",
    light: "#DDD",
    midgrey: "#777",
    navbar: "#666",
  });

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        isLightTheme: isLightTheme,
        light: light,
        dark: dark,
        toggleTheme: toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
