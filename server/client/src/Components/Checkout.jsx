import React, { useContext, useEffect } from "react";
import DeliveryInfo from "./DeliveryInfo";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartContext from "./CartContext";

const Checkout = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { state } = useContext(CartContext);

  useEffect(() => {
    if (user?.id === "" || state?.length === 0) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div className="h-screen max-h-screen pl-10  pr-10 pb-20">
      <div className="pt-10">
        <DeliveryInfo />
      </div>
    </div>
  );
};

export default Checkout;
