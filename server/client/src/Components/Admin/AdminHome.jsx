import React, { useState, useEffect } from "react";
import AdminTabs from "./AdminTabs";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logoutUser, setUser } from "../../Redux/UserSlice";
import restricted from "../../assets/restricted.png";

const AdminHome = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCurrentUser() {
      const currentUserUrl = "/api/v1/user/currentUser";

      try {
        const result = await axios.get(currentUserUrl, {
          withCredentials: true,
        });
        dispatch(setUser(result?.data?.user));
      } catch (error) {
        return error;
      }
    }
    fetchCurrentUser();
  }, []);

  const [tabDetailsToLoad, setTabDetailsToLoad] = useState("");
  const selectedTab = async (tabId) => {
    if (tabId === "addItem") {
      navigate("/admin/addItem");
      return;
    }
    if (tabId === "listItems") {
      navigate("/admin/listItems");
      return;
    }

    if (tabId === "orders") {
      navigate("/admin/orders");
      return;
    }

    if (tabId === "back") {
      navigate("/");
      return;
    }

    if (tabId === "logout") {
      const logoutUrl = "/api/v1/auth/logout";

      try {
        await axios.get(logoutUrl, {
          withCredentials: true,
        });
        navigate("/");
        dispatch(logoutUser());

        localStorage.removeItem("token");
        toast.success("Logout successful");
        return;
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    }
    setTabDetailsToLoad(tabId);
  };

  {
    return user.role === "admin" ? (
      <div>
        <p className="pt-5 font-primary text-gray-700 font-extrabold text-2xl">
          Welcome, {user.name}
        </p>
        <div className="w-full max-w-2xl mx-auto pt-10 p-5">
          <Outlet />
          <div className="bg-white p-3 py-5 rounded-md">
            <AdminTabs selectedTab={selectedTab} />
          </div>
        </div>
      </div>
    ) : (
      <div className="w-screen max-w-lg mx-auto pt-20 pb-20 ">
        <div className="flex ">
          <img src={restricted} alt="restricted" />
          <p className="font-bold text-2xl py-5">Not an admin user!</p>
        </div>
      </div>
    );
  }
};

export default AdminHome;
