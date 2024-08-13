import React, { useContext, useEffect, useState } from "react";
import CartTotals from "./CartTotals";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "./CartContext";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DeliveryInfo = () => {
  const { state } = useContext(CartContext);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [countriesList, setCountriesList] = useState();

  const [addressFormDetails, setAddressFormDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeFormValue = (event) => {
    const { name, value } = event.target;
    setAddressFormDetails({ ...addressFormDetails, [name]: value });
  };

  useEffect(() => {
    async function fetchCountries() {
      try {
        const countries = await axios.get("https://restcountries.com/v3.1/all");
        setCountriesList(countries.data);
      } catch (error) {
        return error;
      }
    }
    fetchCountries();
  }, []);

  const placeOrder = async (event) => {
    event.preventDefault();
    try {
      const createOrderUrl = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/orders/createOrder`;

      const newOrder = {
        orderedBy: user.id,
        items: state,
        name: addressFormDetails.lname + " " + addressFormDetails.fname,
        address: `${addressFormDetails.address},${addressFormDetails.city},${addressFormDetails.state},${addressFormDetails.zipcode},${addressFormDetails.country},${addressFormDetails.phone}`,
      };

      const order = await axios.post(createOrderUrl, newOrder, {
        withCredentials: true,
      });

      if (order?.data?.status === "success") {
        navigate(`/orders/${order.data.order_id}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <form onSubmit={placeOrder}>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 pt-10 pb-10">
        <div>
          <p className="font-extrabold text-2xl">Delivery Information</p>
          <div className="flex flex-col w-full max-w-lg pt-5">
            <div className="grid grid-cols-2 gap-1">
              <input
                type="text"
                className="bg-slate-300 px-2 py-3 mt-2"
                placeholder="Firstname"
                required
                name="fname"
                value={addressFormDetails.fname}
                onChange={onChangeFormValue}
              />
              <input
                type="text"
                className="bg-slate-300 px-2 py-3 mt-2"
                placeholder="Lastname"
                required
                name="lname"
                value={addressFormDetails.lname}
                onChange={onChangeFormValue}
              />
            </div>
            <input
              type="email"
              className="bg-slate-300 px-2 py-3 mt-2"
              placeholder="Email"
              required
              name="email"
              value={addressFormDetails.email}
              onChange={onChangeFormValue}
            />
            <input
              type="text"
              className="bg-slate-300 px-2 py-3 mt-2"
              placeholder="Address"
              required
              name="address"
              value={addressFormDetails.address}
              onChange={onChangeFormValue}
            />
            <div className="grid grid-cols-2 gap-1">
              <input
                type="text"
                className="bg-slate-300 px-2 py-3 mt-2"
                placeholder="City"
                required
                name="city"
                value={addressFormDetails.city}
                onChange={onChangeFormValue}
              />
              <input
                type="text"
                className="bg-slate-300 px-2 py-3 mt-2"
                placeholder="State"
                required
                name="state"
                value={addressFormDetails.state}
                onChange={onChangeFormValue}
              />
            </div>
            <div className="grid grid-cols-2 gap-1">
              <input
                type="number"
                className="bg-slate-300 px-2 py-3 mt-2"
                placeholder="Zip code"
                required
                name="zipcode"
                value={addressFormDetails.zipcode}
                onChange={onChangeFormValue}
              />
              <select
                name="country"
                id="country"
                className="bg-slate-300 px-2 py-3 mt-2"
                value={addressFormDetails.country}
                onChange={onChangeFormValue}
              >
                {countriesList?.map((country) => {
                  return (
                    <option value={country?.name?.common} key={country.name}>
                      {country?.name?.common}
                    </option>
                  );
                })}
              </select>
            </div>
            <input
              type="number"
              className="bg-slate-300 px-2 py-3 mt-2"
              placeholder="Phone"
              required
              name="phone"
              value={addressFormDetails.phone}
              onChange={onChangeFormValue}
            />
          </div>
        </div>
        <div className="pt-10">
          <CartTotals />
        </div>
      </div>
      <div className="pt-36 flex justify-end">
        <Link
          to="/cart"
          className="bg-gray-500 text-white px-2 py-2 font-bold mr-2"
        >
          Back
        </Link>
        <button className="bg-primary text-white px-2 py-2 font-bold float-right">
          Place Order
        </button>
      </div>
    </form>
  );
};

export default DeliveryInfo;
