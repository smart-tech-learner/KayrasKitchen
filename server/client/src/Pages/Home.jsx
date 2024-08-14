import React, { useEffect, useState } from "react";
import home_banner from "../assets/home_banner.png";
import menu1 from "../assets/menus/menu_1.png";
import menu2 from "../assets/menus/menu_2.png";
import menu3 from "../assets/menus/menu_3.png";
import menu4 from "../assets/menus/menu_4.png";
import menu5 from "../assets/menus/menu_5.png";
import menu6 from "../assets/menus/menu_6.png";
import menu7 from "../assets/menus/menu_7.png";
import menu8 from "../assets/menus/menu_8.png";
import Menus from "../Components/Menus";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../Redux/UserSlice";
import Dishes from "../Components/Dishes";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [menuToFilter, setMenuToFilter] = useState("");

  useEffect(() => {
    async function fetchCurrentUser() {
      const currentUserUrl = "/api/v1/user/currentUser";

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
  }, [user]);

  const menus = [
    { id: 1, name: "Salad", image: menu1 },
    { id: 2, name: "Rolls", image: menu2 },
    { id: 3, name: "Deserts", image: menu3 },
    { id: 4, name: "Sandwich", image: menu4 },
    { id: 5, name: "Cake", image: menu5 },
    { id: 6, name: "Pure Veg", image: menu6 },
    { id: 7, name: "Pasta", image: menu7 },
    { id: 8, name: "Noodles", image: menu8 },
  ];

  const selectedMenu = (menuOption) => {
    if (menuToFilter) {
      if (menuToFilter === menuOption) {
        setMenuToFilter("");
        return;
      }
    }
    setMenuToFilter(menuOption);
  };

  return (
    <div>
      <div className="flex justify-center items-center pt-10">
        <img
          className="object-cover lg:h-96 w-full rounded-2xl"
          src={home_banner}
          alt="banner"
        />
      </div>
      <div className="pt-2">
        <p className="text-2xl font-bold text-gray-700">Explore our menu</p>
        <div className="text-slate-600 font-semibold">
          <p>
            Choose from a diverse menu featuring a delectable array of dishes.
          </p>
          <p>
            Our mission is to satisfy your cravings and elevate your dining
            experience..
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 pt-10">
        {menus?.map((menu) => {
          return (
            <Menus
              menu={menu}
              key={menu.id}
              selectedMenu={selectedMenu}
              menuToHighlight={menuToFilter}
            />
          );
        })}
      </div>
      {/* Top dishes near you section */}
      <div className="pt-2">
        <div className="pt-10 text-2xl font-bold text-gray-900">
          <p className="font-semibold text-2xl">Top dishes near you</p>
        </div>
        {/* dishes list */}
        <Dishes selectedMenuOption={menuToFilter} />
      </div>
    </div>
  );
};

export default Home;
