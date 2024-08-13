import React from "react";
import brand_logo from "../../assets/brand_logo.png";
import user_image from "../../../src/assets/user.png";
import { useSelector } from "react-redux";

const AdminHeader = ({ children }) => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <div className="bg-white p-5">
        <div className="grid grid-cols-3">
          <div className="flex justify-start items-start flex-col font-primary">
            <div className="flex">
              <img className="h-14" src={brand_logo} alt="logo" />
              <div className="grid">
                <p className="text-primary font-primary text-2xl font-bold px-2">
                  𝕂𝕒𝕪𝕣𝕒'𝕤
                </p>
                <p className="px-2">𝑲𝒊𝒕𝒄𝒉𝒆𝒏</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center font-primary flex-col">
            <h1 className="text-2xl font-bold text-primary">Admin Portal</h1>
          </div>
          <div className="flex justify-end items-end font-primary flex-col mb-2">
            {user?.id !== "" && (
              <img
                className="rounded-full"
                src={user?.image ? user.image : user_image}
                alt="image"
                width="40"
              />
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AdminHeader;
