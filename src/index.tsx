import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <>
      <a
        style={{
          textDecoration: "none",
          width: "150px",
          height: "36px",
          lineHeight: "36px",
          textAlign: "center",
          display: "inline-block",
        }}
        href="/"
      >
        {"Image Editor"}
      </a>
      <a
        style={{
          textDecoration: "none",
          width: "150px",
          height: "36px",
          lineHeight: "36px",
          textAlign: "center",
          display: "inline-block",
        }}
        href="/ml"
      >
        {"Remove Bg ML"}
      </a>
      <a
        style={{
          textDecoration: "none",
          width: "150px",
          height: "36px",
          lineHeight: "36px",
          textAlign: "center",
          display: "inline-block",
        }}
        href="/ps"
      >
        {"PhotoShop API"}
      </a>
      <App />
    </>
  </React.StrictMode>,
  document.getElementById("root")
);
