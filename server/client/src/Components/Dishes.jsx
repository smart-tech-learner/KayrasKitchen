import React, { useEffect, useState } from "react";
import DishCard from "./DishCard";
import axios from "axios";

const Dishes = (props) => {
  const [allFoods, setAllFoods] = useState([]);
  useEffect(() => {
    async function fetchAllFooods() {
      const fetchAllFoodsUrl = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/allFoods`;

      try {
        const foods = await axios.get(fetchAllFoodsUrl, {
          withCredentials: true,
        });

        if (props.selectedMenuOption) {
          const filtered = foods?.data?.data?.filter((food) => {
            return food.category === props.selectedMenuOption;
          });
          setAllFoods(filtered);
        } else {
          setAllFoods(foods.data.data);
        }
      } catch (error) {
        return error;
      }
    }
    fetchAllFooods();
  }, [props]);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 pt-5">
      {allFoods.map((food) => {
        return <DishCard food={food} key={food._id} />;
      })}
    </div>
  );
};

export default Dishes;
