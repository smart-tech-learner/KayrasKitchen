import React from "react";
import logout from "../assets/logout.png";
import settings from "../assets/settings.png";
import { logoutUser } from "../Redux/UserSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import orders from "../assets/order.png";
import { Link } from "react-router-dom";

const ProfileOptions = (props) => {
  const dispatch = useDispatch();

  const onClickLogoutUser = async () => {
    const logoutUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/logout`;

    try {
      await axios.get(logoutUrl, {
        withCredentials: true,
      });
      dispatch(logoutUser());
      localStorage.removeItem("token");
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
    props.closeProfileOptions();
  };

  return (
    <div className="fixed right-7 top-16 py-3">
      <div className="bg-white p-3 rounded-lg grid px-5">
        <div className="flex">
          <img src={settings} alt="settings" />
          <button className="px-2">Settings</button>
        </div>
        <hr className="mb-3 mt-3"></hr>
        <div className="flex">
          <img src={orders} alt="orders" />
          <Link
            to="/orders"
            className="px-2"
            onClick={() => props.closeProfileOptions()}
          >
            Orders
          </Link>
        </div>
        <hr className="mb-3 mt-3"></hr>
        <div className="flex">
          <img src={logout} alt="logout" height="6" />
          <button type="button" className="px-2" onClick={onClickLogoutUser}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOptions;
