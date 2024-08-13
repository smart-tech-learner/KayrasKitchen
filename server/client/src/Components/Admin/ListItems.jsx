import axios from "axios";
import React, { useEffect, useState } from "react";

const ListItems = () => {
  const [allFoods, setAllFoods] = useState();
  useEffect(() => {
    async function fetchListItems() {
      const allFoodsUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/allFoods`;
      const response = await axios.get(allFoodsUrl, {
        withCredentials: true,
      });
      setAllFoods(response.data.data);
    }
    fetchListItems();
  }, []);

  return (
    <div className="overflow-x-auto pl-2">
      <h1 className="text-2xl py-5 px-5 pb-10 font-primary text-primary font-bold">
        Add Foods List
      </h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-200 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {allFoods?.length === 0 && (
            <p className="text-2xl px-2 pt-5">No records found!</p>
          )}
          {allFoods?.map((food) => {
            return (
              <tr className="border-b dark:bg-gray-200 dark:border-gray-200 text-black">
                <td scope="row" className="px-6 py-4">
                  <img className="rounded-full" src={food.image} width="25" />
                </td>
                <td className="px-6 py-4">{food.name}</td>
                <td className="px-6 py-4">{food.category}</td>
                <td className="px-6 py-4">{food.price}</td>
                <td className="px-6 py-4"></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListItems;
