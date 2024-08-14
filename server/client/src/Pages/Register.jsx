import React, { useState } from "react";
import { Link } from "react-router-dom";
import cross_icon from "../assets/cross_icon.png";
import { uploadFile } from "../Utils/FileUpload";
import axios from "axios";
import { toast } from "react-toastify";

const Register = (props) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
    role: "user",
  });

  const [uploadedFile, setUploadedFile] = useState("");

  const onClickLogin = () => {
    props.onClickLogin();
  };

  const onChangeRegisterFormDetails = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const uploadProfileImage = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  const registerUser = async (event) => {
    event.preventDefault();

    if (uploadedFile) {
      try {
        const imageUrl = await uploadFile(uploadedFile);
        if (imageUrl?.url) {
          setUserDetails({ ...userDetails, image: imageUrl.url });
        }

        const registerUrl = "/api/v1/auth/register";

        const userRegsitration = await axios.post(registerUrl, userDetails);
        if (userRegsitration?.data?.status === "success") {
          toast.success("Registered successfully!");
        }
        props.closeRegisterForm();
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    }
  };

  return (
    <div>
      <div className="w-full max-w-md bg-white p-10 mx-auto mt-20 rounded-md">
        <div className="flex justify-between">
          <div>
            <p className="text-primary font-bold text-2xl font-primary pb-5">
              Register
            </p>
          </div>
          <div className="flex justify-end items-end pb-10">
            <img
              className="pt-13"
              src={cross_icon}
              alt="cross"
              onClick={() => props.closeRegisterForm()}
            />
          </div>
        </div>
        <form onSubmit={registerUser}>
          <div className="grid pb-5">
            <label htmlFor="name">Name</label>
            <input
              className="bg-slate-200 px-3 py-3 rounded-md focus:outline-primary"
              type="text"
              name="name"
              id="name"
              placeholder="enter name..."
              required
              onChange={onChangeRegisterFormDetails}
              value={userDetails.name}
            />
          </div>
          <div className="grid pb-5">
            <label htmlFor="email">Email</label>
            <input
              className="bg-slate-200 px-3 py-3 rounded-md focus:outline-primary"
              type="email"
              name="email"
              id="email"
              placeholder="enter email..."
              required
              onChange={onChangeRegisterFormDetails}
              value={userDetails.email}
            />
          </div>

          <div className="grid pb-5">
            <label htmlFor="password">Password</label>
            <input
              className="bg-slate-200 px-3 py-3 rounded-md focus:outline-primary"
              type="password"
              name="password"
              id="password"
              placeholder="enter password..."
              required
              onChange={onChangeRegisterFormDetails}
              value={userDetails.password}
            />
          </div>
          <div className="grid">
            <label htmlFor="image">Profile picture(optional)</label>
            <input
              className="bg-slate-200 px-3 py-3 rounded-md focus:outline-primary"
              type="file"
              name="image"
              id="image"
              onChange={uploadProfileImage}
            />
          </div>
          <div className="grid pt-10">
            <button className="bg-primary px-2 py-2 rounded-md text-white font-bold mr-2">
              Register
            </button>
          </div>
        </form>

        <div className="pt-5 flex justify-center">
          Already have an account?{"  "}
          <Link className="text-primary" onClick={onClickLogin}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
