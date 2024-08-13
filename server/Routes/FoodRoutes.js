import { Router } from "express";
import { addFood, allFoods } from "../Controllers/FoodController.js";
import { authenticateUser } from "../Middlewares/AuthMiddleware.js";

const router = Router();

router.post("/addFood", authenticateUser, addFood);
router.get("/allFoods", allFoods);

export default router;
