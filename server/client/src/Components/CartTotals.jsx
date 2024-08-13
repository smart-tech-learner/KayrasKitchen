import React, { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";

const CartTotals = () => {
  const { state } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState();

  useEffect(() => {
    if (state) {
      setSubTotal(calculateSubTotal());
    }
  }, [state]);

  const calculateSubTotal = () => {
    let sum = 0;

    state?.map((item) => {
      if (item) {
        sum = sum + item.price * item.quantity;
      }
    });

    if (sum === 0) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(80);
    }
    return sum;
  };

  return (
    <div>
      <p className="font-extrabold text-2xl">Cart Total</p>
      <div className="pt-5 lg:w-5/6">
        <div className="flex justify-between bg-slate-300 px-2 py-2 mb-1">
          <div className="mx-2">Subtotal</div>
          <div className="mr-2">{subTotal}</div>
        </div>
        <div className="flex justify-between bg-slate-300 px-2 py-2 mb-1">
          <div className="mx-2">Delivery Fee</div>
          <div className="mr-2">{deliveryFee}</div>
        </div>
        <div className="flex justify-between bg-slate-300 px-2 py-2 mb-1">
          <div className="font-bold mx-2">Total</div>
          <div className="mr-2 font-bold">{subTotal + deliveryFee}</div>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
