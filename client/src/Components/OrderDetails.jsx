import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import unauthorized from "../assets/unauthorized.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const OrderDetails = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState();
  const [fetchStatus, setFetchStatus] = useState("fetching");
  const params = useParams();

  useEffect(() => {
    if (user?.id === "") {
      navigate("/");
      return;
    }

    const { id } = params;

    async function fetchOrder() {
      const fetchOrderUrl = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/orders/${id}`;

      try {
        const details = await axios.get(fetchOrderUrl, {
          withCredentials: true,
        });

        setOrderDetails({ ...details.data.details });
        setFetchStatus("success");
      } catch (error) {
        setFetchStatus("failure");
        toast.error(error?.response?.data?.msg);
        return error;
      }
    }
    fetchOrder();
  }, []);

  const calculateTotal = () => {
    let sum = 0;
    orderDetails?.items?.map((item) => {
      sum = sum + item.price * item.quantity;
    });
    return sum;
  };

  const createdDateString = () => {
    const createdDate = day(orderDetails?.createdAt).format(
      "MMM Do, YYYY hh:mm:ss"
    );
    return createdDate;
  };

  return (
    <div>
      {fetchStatus === "success" ? (
        <div className="bg-white p-3 rounded-md mt-10 mx-5 mb-10">
          <div className="flex justify-between">
            <div className="px-3 py-3">
              <p className="font-bold">Order #{orderDetails?._id}</p>
              <p className="font-light">
                {orderDetails?.status} | {createdDateString()}
              </p>
            </div>
            <div className="px-3 py-3">
              <Link
                type="button"
                to="/orders"
                className="bg-primary text-white px-2 py-2 font-bold rounded-md"
              >
                Close
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-1">
            <div className="pt-10 pb-10 ">
              {orderDetails?.items?.map((item, index) => {
                return (
                  <div
                    className="w-full max-w-md mx-auto p-2 rounded-md"
                    key={item.id}
                  >
                    <div className="flex justify-between rounded-md bg-slate-200 p-2">
                      <div className="p-2">
                        <p className="font-bold">{item?.name}</p>
                        <p className="font-thin">Qty {item?.quantity}</p>
                      </div>
                      <div className="p-2">
                        <p className="font-bold">
                          &#8377; {item?.price * item?.quantity}
                        </p>
                        <p className="font-thin"> &#8377; {item?.price} each</p>
                      </div>
                    </div>
                    {/* {orderDetails?.items?.length !== index + 1 && (
                    <p>
                      ---------------------------------------------------------------
                    </p>
                  )} */}
                  </div>
                );
              })}
            </div>
            <div className="w-full max-w-md mx-auto pt-10">
              <div>
                <div>
                  <p className="font-bold">Delivery Address</p>
                  <div className="pt-2">
                    <p className="font-semibold">{orderDetails?.name}</p>
                    <p>{orderDetails?.address}</p>
                  </div>
                </div>
                <div className="pt-10">
                  <p className="font-bold">Total</p>
                  <p className="pt-2"> &#8377; {calculateTotal()}</p>
                </div>
                <div className="pt-10 pb-10">
                  <p className="font-bold">Payment Mode</p>
                  <p className="pt-2">Pay on Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-lg mx-auto pt-20 pb-20">
          <div className="flex justify-center items-center">
            <img src={unauthorized} alt="unauthorized" />
            <p className="font-bold text-2xl">
              Not authorized to access the resource.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
