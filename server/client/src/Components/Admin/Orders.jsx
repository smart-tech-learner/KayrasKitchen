import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import day from "dayjs";
import home_icon from "../../assets/home_icon.png";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useNavigate } from "react-router-dom";
day.extend(advancedFormat);

const Orders = () => {
  const navigate = useNavigate();

  const [allOrders, setAllOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState();

  useEffect(() => {
    async function fetchAllOrders() {
      const fetchAllOrdersUrl = "/api/v1/orders";

      try {
        const response = await axios.get(fetchAllOrdersUrl, {
          withCredentials: true,
        });

        if (response?.data?.status === "success") {
          setAllOrders(response.data.orders);
          allOrders?.map((order) => {
            setOrderStatus(order.status);
          });
        }
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    }
    fetchAllOrders();
  }, [allOrders]);

  const createdDateString = (createdAt) => {
    const createdDate = day(createdAt).format("MMM Do, YYYY hh:mm:ss");
    return createdDate;
  };

  const calculateTotal = (items) => {
    let sum = 0;
    items?.map((item) => {
      sum = sum + item.price * item.quantity;
    });
    return sum;
  };

  const updateStatus = async (order_id) => {
    setOrderStatus(event.target.value);
    const statusUpdateUrl = `/api/v1/orders/update/${order_id}`;

    const params = { status: event.target.value };
    try {
      const response = await axios.post(statusUpdateUrl, params, {
        withCredentials: true,
      });

      if (response?.data?.status === "success") {
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  const navigateToAdminHome = () => {
    navigate("/admin");
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl py-5 px-1 pb-10 font-primary text-primary font-bold">
          Orders
        </h1>
        <div className=" py-5 px-5 pb-10 font-primary text-primary font-bold">
          <img
            className="h-8"
            src={home_icon}
            alt="home"
            onClick={navigateToAdminHome}
          />
        </div>
      </div>
      <div className="pb-10 h-screen p-2 bg-slate-200">
        <div className="">
          {allOrders?.map((order) => {
            return (
              <div
                className="flex justify-between bg-white mt-2 rounded-md"
                key={order._id}
              >
                <div className="p-5 mt-2 w-full rounded-md">
                  <p className="font-bold overflow-hidden whitespace-nowrap text-ellipsis w-24">
                    #{order._id}
                  </p>
                  <p className="font-extralight">
                    {createdDateString(order.createdAt)} | &#8377;{" "}
                    {calculateTotal(order.items)}
                  </p>
                  <p className="font-extralight">{order.status}</p>
                  <div className="pt-5">
                    <ul>
                      {order?.items?.map((item) => {
                        return (
                          <li key={item?.id}>
                            {item.name} * {item.quantity}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="mr-5 pt-5">
                  <select
                    name="status"
                    id="status"
                    className=" px-2 py-2 bg-primary text-white font-bold"
                    value={order.status}
                    onChange={() => updateStatus(order._id)}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Order Processing">Order Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
