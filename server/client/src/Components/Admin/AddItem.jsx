import React, { useState } from "react";
import { CATEGORIES } from "../../Utils/Constants";
import axios from "axios";
import UploadImage from "../UploadImage";
import { toast } from "react-toastify";

export const AddItem = (props) => {
  const [openUploadImageScreen, setOpenUploadImageScreen] = useState(false);
  const [foodItem, setFoodItem] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });

  const onEnterFoodItemDetails = (event) => {
    const { name, value } = event.target;
    setFoodItem({ ...foodItem, [name]: value });
  };

  const addFoodItem = async (event) => {
    event.preventDefault();

    if (foodItem.image === "") {
      alert("Please upload image!");
      return;
    }

    try {
      const addItemUrl = "/api/v1/addFood";
      await axios.post(addItemUrl, foodItem, {
        withCredentials: true,
      });
      props.loadListItemsTab();
      toast.success("added successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  const setUploadedUrl = (url) => {
    setFoodItem({ ...foodItem, image: url });
    setOpenUploadImageScreen(false);
  };

  return (
    <div className="lg:w-6/12">
      <h1 className="text-2xl py-5 px-5 pb-10 font-primary text-primary font-bold">
        Add Item
      </h1>
      <form
        className="p-10 bg-slate-100 mx-5 rounded-md"
        onSubmit={addFoodItem}
      >
        <div className="grid text-xl pb-2">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="enter product name.."
            value={foodItem.name}
            className="bg-slate-200 py-2 px-2 rounded-md hover:outline-primary"
            onChange={onEnterFoodItemDetails}
          />
        </div>
        <div className="grid pb-2">
          <label className="text-xl" htmlFor="description">
            Product Description
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            rows="4"
            required
            placeholder="enter product description.."
            value={foodItem.description}
            className="bg-slate-200 py-2 px-2 rounded-md hover:outline-primary"
            onChange={onEnterFoodItemDetails}
          />
        </div>
        <div className="grid grid-cols-2 pb-2 w-full">
          <div className="grid grid-cols-1 px-1">
            <label className="text-xl" htmlFor="category">
              Category
            </label>
            <select
              name="category"
              id="category"
              required
              className="bg-slate-200 py-2 px-2 rounded-md hover:outline-primary"
              placeholder="enter category.."
              value={foodItem.category}
              onChange={onEnterFoodItemDetails}
            >
              {Object.values(CATEGORIES).map((category) => {
                return <option value={category}>{category}</option>;
              })}
            </select>
          </div>
          <div className="grid grid-cols-1">
            <label className="text-xl" htmlFor="price">
              Product Price(<del>&#2352;</del>)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              required
              placeholder="0.00"
              value={foodItem.price}
              onChange={onEnterFoodItemDetails}
              className="bg-slate-200 py-2 px-2 rounded-md hover:outline-primary"
            />
          </div>
        </div>
        <div className="pt-5 flex justify-center items-center">
          <button
            type="button"
            onClick={() => setOpenUploadImageScreen(!openUploadImageScreen)}
            className="px-2 py-2 bg-primary rounded-md mr-2 text-white font-bold"
          >
            Upload Image
          </button>
          <button
            type="submit"
            className="px-2 py-2 bg-primary rounded-md mr-2 text-white font-bold"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => props.resetTabs()}
            className="px-2 py-2 bg-slate-400 rounded-md mr-2 text-white font-bold"
          >
            Cancel
          </button>
        </div>
      </form>
      {openUploadImageScreen && (
        <UploadImage
          uploadedUrl={setUploadedUrl}
          closeUpload={() => setOpenUploadImageScreen(!openUploadImageScreen)}
        />
      )}
    </div>
  );
};
