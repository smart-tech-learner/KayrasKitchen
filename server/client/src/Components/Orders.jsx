import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Orders = () => {
  const user = useSelector((state) => state.user);

  const [allOrders, setAllOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id === "") {
      navigate("/");
      return;
    }

    async function fetchAllOrders() {
      const fetchAllOrdersUrl = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/orders`;

      try {
        const response = await axios.get(fetchAllOrdersUrl, {
          withCredentials: true,
        });

        if (response?.data?.status === "success") {
          setAllOrders(response.data.orders);
        }
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    }
    fetchAllOrders();
  }, []);

  const createdDateString = (createdAt) => {
    const createdDate = day(createdAt).format("MMM Do, YYYY hh:mm:ss");
    return createdDate;
  };

  const viewOrderDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const calculateTotal = (items) => {
    let sum = 0;
    items?.map((item) => {
      sum = sum + item.price * item.quantity;
    });
    return sum;
  };

  return (
    <div>
      <button>Home</button>
      <div className="pt-10 pb-10">
        {allOrders?.map((order) => {
          return (
            <div
              className="p-5 bg-white mt-2 w-full max-w-screen-lg mx-auto rounded-md"
              onClick={() => viewOrderDetails(order._id)}
            >
              <p className="font-bold">Order #{order._id}</p>
              <p className="font-extralight">
                {order.status} | {createdDateString(order.createdAt)} | &#8377;{" "}
                {calculateTotal(order.items)}
              </p>
              <div className="pt-5">
                <ul>
                  {order?.items?.map((item) => {
                    return (
                      <li>
                        {item.name} * {item.quantity}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
