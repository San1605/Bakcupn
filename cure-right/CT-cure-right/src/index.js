import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Provider as ReduxProvider } from "react-redux";
import { ProSidebarProvider } from "react-pro-sidebar";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import store from "./redux/store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReduxProvider store={store}>
    <ProSidebarProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </ProSidebarProvider>
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
