import React, { useState } from "react";
import brand_logo from "../assets/brand_logo.png";
import bag from "../assets/bag.png";
import user_image from "../assets/user.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileOptions from "../Pages/ProfileOptions";

const Header = (props) => {
  const location = useLocation();
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const showLoginForm = () => {
    props.showLogin();
  };

  const onClickCart = () => {
    navigate("/cart");
  };

  const showProfileOptionsPage = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const closeProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const OnClickHeader = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-between px-12 pb-3 ">
      <div className="flex" onClick={() => OnClickHeader()}>
        <img className="h-14" src={brand_logo} alt="logo" />
        <div className="grid">
          <p className="text-primary font-primary text-2xl font-bold px-2">
            𝕂𝕒𝕪𝕣𝕒'𝕤
          </p>
          <p className="px-2">𝑲𝒊𝒕𝒄𝒉𝒆𝒏</p>
        </div>
      </div>

      {location.pathname === "/admin" && (
        <div>
          <p className="font-bold text-primary text-2xl">Admin Portal</p>
        </div>
      )}

      <div className="flex">
        {user?.id !== "" && (
          <div className="pr-3 py-1">
            <img src={bag} alt="bag" width="30" onClick={onClickCart} />
          </div>
        )}
        <div>
          {user?.id === "" ? (
            <button
              className="bg-primary px-5 py-2 rounded-2xl text-white font-bold"
              onClick={showLoginForm}
              type="button"
            >
              Sign in
            </button>
          ) : (
            <img
              className="rounded-full"
              src={user?.image ? user.image : user_image}
              alt="image"
              width="40"
              onClick={showProfileOptionsPage}
            />
          )}
        </div>
      </div>

      {showProfileOptions && (
        <ProfileOptions closeProfileOptions={closeProfileOptions} />
      )}
    </div>
  );
};

export default Header;
