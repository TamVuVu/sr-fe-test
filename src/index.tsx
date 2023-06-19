import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./Store";
import { Home } from "./Pages";
import { Portfolio } from "./Pages/Porforlio";
import { Login } from "./Pages/Login";

import "./index.scss";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  {
    path: "*",
    element: <h1>404 NOT FOUND</h1>,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
