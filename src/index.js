import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import MemeGenerator from './meme-generator/MemeGenerator'

ReactDOM.render(<MemeGenerator />, document.getElementById("root"));
