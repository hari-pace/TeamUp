import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import AuthContextProvider from "./context/authContext.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
        <ParallaxProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ParallaxProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
