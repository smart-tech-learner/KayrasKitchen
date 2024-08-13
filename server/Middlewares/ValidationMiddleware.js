import { body, param, validationResult } from "express-validator";
import { UserModel } from "../Models/UserModel.js";
import mongoose from "mongoose";
import OrderModel from "../Models/OrdersModel.js";

const validationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMsgs = errors.array().map((error) => error.msg);
        throw new Error(errorMsgs);
      }
      next();
    },
  ];
};

export const validateRegister = validationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Not a valid email")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) throw new Error("Email already exists");
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password should be between 8 and 15 characters long"),
]);

export const validateLogin = validationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Not a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
]);

export const validateIdParams = validationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);

    if (!isValidMongoId) throw new Error("invalid Mongo Id...");

    const order = await OrderModel.findById(value);
    if (!order) throw new Error("Order not found");

    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === order.orderedBy.toString();

    if (!isAdmin && !isOwner) {
      throw new Error("Not authorized to access the resource");
    }
  }),
]);
