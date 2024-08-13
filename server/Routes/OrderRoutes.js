import { Router } from "express";
import {
  createOrder,
  fetchAllOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../Controllers/OrderController.js";
import { validateIdParams } from "../Middlewares/ValidationMiddleware.js";
import { authenticateUser } from "../Middlewares/AuthMiddleware.js";

const router = Router();

router.post("/createOrder", createOrder);
router.get("/", authenticateUser, fetchAllOrders);
router.get("/:id", authenticateUser, validateIdParams, getSingleOrder);
router.post(
  "/update/:id",
  authenticateUser,
  validateIdParams,
  updateOrderStatus
);

export default router;
