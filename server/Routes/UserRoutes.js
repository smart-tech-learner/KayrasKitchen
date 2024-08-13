import { Router } from "express";
import { currentUser } from "../Controllers/UserContrloller.js";

const router = Router();

router.get("/currentUser", currentUser);

export default router;
