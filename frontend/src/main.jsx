import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import "./index.css";

import {
  RouterProvider,
} from "react-router-dom";

import router from "./routes";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <RouterProvider router={router} />

    <ToastContainer />
  </React.StrictMode>
);