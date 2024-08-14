import { createBrowserRouter } from "react-router-dom";
import AdminHome from "../Components/Admin/AdminHome";
import App from "../App";
import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import Checkout from "../Components/Checkout";
import OrderDetails from "../Components/OrderDetails";
import Orders from "../Components/Admin/Orders";
import Error from "../Pages/Error";
import { AddItem } from "../Components/Admin/AddItem";
import ListItems from "../Components/Admin/ListItems";

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
      {
        path: "admin/addItem",
        element: <AddItem />,
      },
      {
        path: "admin/listItems",
        element: <ListItems />,
      },
      {
        path: "admin/orders",
        element: <Orders />,
      },
    ],
  },
]);

export default router;
