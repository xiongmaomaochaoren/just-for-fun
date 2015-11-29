import React, { Component } from "react";
import ReactDOM from "react-dom";

import ToggleButton from "./components/ToggleButton";
import ToggleContainer from "./components/ToggleContainer";

let containerId = "react-container";

ReactDOM.render(
    <ToggleContainer />,
    document.getElementById(containerId)
);
