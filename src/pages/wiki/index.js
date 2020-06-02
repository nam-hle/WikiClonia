import "./../../components/WikiApp/normalize.css";
import "./../../components/WikiApp/theme.scss";
import "./../../components/WikiApp/style.sass";

import ReactDOM from "react-dom";
import React from "react";
import App from "./../../components/WikiApp";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("wikiapp")
);
