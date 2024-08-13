import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import router from "./Routes/index.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.js";
import { CartProvider } from "./Components/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <Provider store={store}>
      <RouterProvider router={router}>
        <React.StrictMode>
          <ToastContainer position="top-right" />
        </React.StrictMode>
      </RouterProvider>
    </Provider>
  </CartProvider>
);
