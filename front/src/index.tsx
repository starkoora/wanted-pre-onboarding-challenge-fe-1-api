import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./GlobalStyle";
import App from "./App";
import GlobalStyle from "./GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
