import React from "react";
import ReactDOM from "react-dom";
//component files
import TodoContainer from "./components/TodoContainer";

import "./App.css";

ReactDOM.render(
  <React.StrictMode>
    <TodoContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
