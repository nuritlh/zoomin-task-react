import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import store from "./js/store/index";
// import App from "./js/components/App";
import App from "./App";

import 'bootstrap/dist/css/bootstrap.min.css';

render(
    <Provider store={store}>
      <App />
    </Provider>,
    // The target element might be either root or app,
    // depending on your development environment
    // document.getElementById("app")
    document.getElementById("root")
  );