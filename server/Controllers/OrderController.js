import mongoose from "mongoose";
import mongodb from "mongodb";
import OrderModel from "../Models/OrdersModel.js";

export const createOrder = async (request, response) => {
  try {
    const order = await OrderModel.create(request.body);

    return response
      .status(201)
      .json({ status: "success", order_id: order._id });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleOrder = async (request, response) => {
  try {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(request.params);
    if (!isValidMongoId) {
      return response
        .status(404)
        .json({ status: "failure", msg: "Not a valid order" });
    }

    const orderDetails = await OrderModel.findById({
      _id: new mongodb.ObjectId(request.params),
    });

    if (!orderDetails) {
      return response
        .status(404)
        .json({ status: "failure", msg: "order not found" });
    }
    return response
      .status(200)
      .json({ status: "success", details: orderDetails });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllOrders = async (request, response) => {
  try {
    const isAdmin = request.user.role === "admin";

    let orders = "";
    if (isAdmin) {
      orders = await OrderModel.find({});
    } else {
      orders = await OrderModel.find({ orderedBy: request.user.userId });
    }

    if (!orders) {
      return response
        .status(200)
        .json({ status: "success", orders: "no orders found" });
    }

    return response.status(200).json({ status: "success", orders: orders });
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderStatus = async (request, response) => {
  const order = await OrderModel.findById({
    _id: request.params.id,
  });

  if (!order) return response.status(404).json({ msg: "order not found" });

  order.status = request.body.status;

  await OrderModel.findByIdAndUpdate(request.params.id, order);

  return response.status(200).json({
    status: "success",
    msg: "order updated successfully",
    response: order,
  });
};
