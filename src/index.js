import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "react-toastify/dist/ReactToastify.css";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <PrimeReactProvider> */}

      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#22c55e", // This sets the primary color for components like buttons

            // Alias Token
            colorBgContainer: "#ffffff", // Change this to a different background color
            borderRadius: 4,
          },
        }}
      >
        <ToastContainer />
        <App />
      </ConfigProvider>

      {/* </PrimeReactProvider> */}
    </BrowserRouter>
  </Provider>
);
