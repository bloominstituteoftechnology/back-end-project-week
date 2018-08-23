import React from "react";
import { render } from "react-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./containers/App";

axios.defaults.baseURL = "http://localhost:4000/note";

render(<App />, document.getElementById("root"));
