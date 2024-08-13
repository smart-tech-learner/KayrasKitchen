import React from "react";
import brand_logo from "../assets/brand_logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import android from "../assets/android.png";
import apple from "../assets/apple.png";

const Footer = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 bg-black -mr-10 -ml-10 pt-10 gap-5 pl-20 pb-10">
      <div className="text-white">
        <div className="flex">
          <img className="h-16" src={brand_logo} alt="logo" height="20" />
          <p className="py-4 text-white font-primary text-2xl font-bold">
            𝕂𝕒𝕪𝕣𝕒'𝕤 𝑲𝒊𝒕𝒄𝒉𝒆𝒏
          </p>
        </div>

        <div className="text-balance">
          <p className="pt-3">
            Kayra's Kitchen, where delicious meals are just a click away! We
            bring you a world of flavors, freshly prepared and delivered
            straight to your door. Whether you're craving comfort food or
            something exotic, Kayra's Kitchen has you covered with mouthwatering
            dishes that make every meal special.
          </p>
        </div>
      </div>
      <div className="text-white">
        <p className="font-bold">COMPANY</p>
        <br></br>
        <Link to="/">Home</Link>
        <br></br>
        About us
        <br></br>
        Delivery Privacy
        <br></br>
        Policy
        <br></br>
        {user.role == "admin" && <Link to="/admin">Admin Portal</Link>}
      </div>
      <div>
        <p className="font-bold text-white">MOBILE APPS</p>
        <br></br>
        <img className="pb-5" src={android} alt="android" width="180" />
        <img src={apple} alt="apple" width="180" />
      </div>
      <div className="text-white">
        <p className="font-bold">GET IN TOUCH</p>
        <br></br>
        1234567890
        <br></br>
        contact@kayraskitchen.com
      </div>
    </div>
  );
};

export default Footer;
