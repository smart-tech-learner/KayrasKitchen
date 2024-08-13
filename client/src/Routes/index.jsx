import { createBrowserRouter } from "react-router-dom";
import AdminHome from "../Components/Admin/AdminHome";
import AdminHeader from "../Components/Admin/AdminHeader";
import App from "../App";
import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import Checkout from "../Components/Checkout";
import OrderDetails from "../Components/OrderDetails";
import Orders from "../Components/Orders";
import Error from "../Pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:id",
        element: <OrderDetails />,
      },
      {
        path: "admin",
        element: <AdminHome />,
      },
    ],
  },
]);

export default router;
