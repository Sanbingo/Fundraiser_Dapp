import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import NewFundraiser from "./NewFundraiser";
import Home from "./Home";
import Receipts from "./Receipts";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
          <Route path="/home" element={<Home />} />
          <Route path="/new" element={<NewFundraiser />} />
          <Route path="/receipts" element={<Receipts />} />
       
      </Routes>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
