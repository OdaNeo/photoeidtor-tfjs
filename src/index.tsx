import React from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
import "./index.css";
import { ImageEditor } from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <>
      <ImageEditor
        includeUI={{
          loadImage: {
            path: logo,
            name: "SampleImage",
          },
          uiSize: {
            width: "1200px",
            height: "700px",
          },
          menuBarPosition: "bottom",
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
      />
      <div
        style={{
          marginTop: "12px",
        }}
      >
        Upload/Download, ZoomIn/Out, Resize, Clop, Rotate, Text/Draw,
        Filter(All), Undo/Redo
      </div>
    </>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
