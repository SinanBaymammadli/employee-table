import { CssBaseline } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { ReactQueryConfig, ReactQueryConfigProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ReactQueryDevtools } from "react-query-devtools";
import { App } from "./App";
import "./index.css";

// if (process.env.NODE_ENV === "development") {
const { worker } = require("./mocks/browser");
worker.start();
// }

const config: ReactQueryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryConfigProvider config={config}>
      <ReactQueryDevtools />
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactQueryConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
