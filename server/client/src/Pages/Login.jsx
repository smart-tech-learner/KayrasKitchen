import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cross_icon from "../assets/cross_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/UserSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Login = (props) => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const onClickRegister = () => {
    props.onClickRegister();
  };

  const onChangeLoginFormDetails = (event) => {
    const { name, value } = event.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const submitLoginForm = async (event) => {
    event.preventDefault();

    const loginUrl = "/api/v1/auth/login";

    try {
      const response = await axios.post(loginUrl, loginDetails, {
        withCredentials: true,
      });

      if (response?.data?.status === "success") {
        toast.success("Login successful");

        localStorage.setItem("token", response?.data?.token);

        const currentUserUrl = "/api/v1/user/currentUser";

        const result = await axios.get(currentUserUrl, {
          withCredentials: true,
        });

        dispatch(setUser(result?.data?.user));

        props.closeLoginForm();
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <div>
      <div className="w-full max-w-sm bg-white p-10 mx-auto mt-20 rounded-lg">
        <div className="flex justify-between">
          <div>
            <p className="text-primary font-bold text-2xl font-primary pb-5">
              Login
            </p>
          </div>
          <div className="flex justify-end items-end pb-10">
            <img
              className="pt-13"
              src={cross_icon}
              alt="cross"
              onClick={() => props.closeLoginForm()}
            />
          </div>
        </div>

        <form onSubmit={submitLoginForm}>
          <div className="grid pb-5">
            <label htmlFor="email">Email</label>
            <input
              className="bg-slate-200 px-3 py-3 rounded-md focus:outline-primary"
              type="email"
              name="email"
              id="email"
              placeholder="enter email..."
              required
              onChange={onChangeLoginFormDetails}
              value={loginDetails.email}
            />
          </div>
          <div className="grid">
            <label htmlFor="password">Password</label>
            <input
              className="bg-slate-200 px-3 py-3 rounded-md focus:outline-primary"
              type="password"
              name="password"
              id="password"
              placeholder="enter password..."
              required
              onChange={onChangeLoginFormDetails}
              value={loginDetails.password}
            />
          </div>
          <div className="grid pt-10">
            {/* <button className="bg-primary px-2 py-2 rounded-md text-white font-bold mr-2">
              Login
            </button> */}
            <button
              className="bg-primary px-2 py-2 rounded-md text-white font-bold mr-2 text-center w-full"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="pt-5 flex justify-center">
            Don't have an account?{" "}
            <Link className="text-primary" onClick={onClickRegister}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
