import React, { useState, useEffect } from "react";
import AdminTabs from "./AdminTabs";
import { Outlet, useNavigate } from "react-router-dom";
import AdminContent from "./AdminContent";
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
      const currentUserUrl = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/user/currentUser`;

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
    if (tabId === "back") {
      navigate("/");
      return;
    }

    if (tabId === "logout") {
      const logoutUrl = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/auth/logout`;

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

  const resetTabs = () => {
    setTabDetailsToLoad("");
  };

  {
    return user.role === "admin" ? (
      <div className="lg:grid lg:grid-cols-[250px_1fr] h-screen max-h-screen mt-1">
        <Outlet />
        <div className="bg-white p-3 py-5 rounded-md">
          <AdminTabs selectedTab={selectedTab} />
        </div>
        <AdminContent
          tabDetailsToLoad={tabDetailsToLoad}
          resetTabs={resetTabs}
          loadListItemsTab={() => selectedTab("listItems")}
        />
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
