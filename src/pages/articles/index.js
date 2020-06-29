import "./../../styles/normalize.css";
import "./../../styles/theme.scss";
import "./../../styles/style.sass";

import ReactDOM from "react-dom";
import React from "react";
import App from "./../../components/App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("wikiapp")
);
