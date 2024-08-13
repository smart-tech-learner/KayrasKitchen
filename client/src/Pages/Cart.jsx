import React, { useContext, useEffect, useState } from "react";
import remove from "../assets/remove.png";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../Components/CartContext";
import CartTotals from "../Components/CartTotals";
import { useSelector } from "react-redux";

const Cart = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { state } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState();
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    console.log(user);
    if (user?.id === "") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (state) setSubTotal(calculateSubTotal());
  }, [state]);

  const calculateSubTotal = () => {
    let sum = 0;

    state?.map((item) => {
      sum = sum + item.price * item.quantity;
    });

    if (sum === 0) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(80);
    }
    return sum;
  };

  const removeItem = (payload) => {
    const findExisting = state.find((item) => item.id === payload.id);

    const cartItemToRemove = { ...payload, _id: payload.id };

    if (findExisting) {
      dispatch({ type: "REMOVE_FOOD", payload: cartItemToRemove });
    }
  };

  return (
    <div className="h-screen max-h-screen pl-10  pr-10 pb-20 pt-5 overflow-y-auto">
      <table className="table-fixed w-screen text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-14">
        <thead className="text-xs text-gray-200 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Item
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {state.map((cart) => {
            return (
              <tr
                className="border-b dark:bg-gray-200 dark:border-gray-200 text-black"
                key={cart.id}
              >
                <td scope="row" className="px-6 py-4">
                  <img className="rounded-lg" width="30" src={cart.image} />
                </td>
                <td className="px-6 py-4">{cart.name}</td>
                <td className="px-6 py-4">{cart.price}</td>
                <td className="px-6 py-4">{cart.quantity}</td>
                <td className="px-6 py-4">{cart.price * cart.quantity}</td>
                <td className="px-6 py-4">
                  <img
                    src={remove}
                    alt="remove"
                    width="20"
                    onClick={() => removeItem(cart)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pt-10">
        <hr></hr>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10">
          <CartTotals />
          <div>
            <p>If you have a promo code, please enter here</p>
            <div className="flex pt-3">
              <input
                className="px-2 py-2 bg-slate-300 w-full"
                type="text"
                name="promo"
                id="promo"
                placeholder="enter promo code.."
              />
              <button className="bg-black text-white px-8 font-bold py-2">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-36 flex justify-end">
        <Link
          to="/"
          className="bg-gray-500 text-white px-2 py-2 font-bold mr-2"
        >
          Back
        </Link>
        <Link
          to="/checkout"
          className="bg-primary text-white px-2 py-2 font-bold"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
