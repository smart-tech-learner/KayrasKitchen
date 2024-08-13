import { FoodModel } from "../Models/FoodModel.js";

export const addFood = async (request, response) => {
  const food = await FoodModel.create(request.body);

  return response.status(201).json({ status: "success", foodAdded: food });
};

export const allFoods = async (request, response) => {
  const allFoods = await FoodModel.find({});

  return response.status(200).json({ status: "successs", data: allFoods });
};
