import * as dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import FoodRouter from "./Routes/FoodRoutes.js";
import AuthRouter from "./Routes/AuthRoutes.js";
import UserRouter from "./Routes/UserRoutes.js";
import OrderRouter from "./Routes/OrderRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
import errorHandlerMiddleware from "./Middlewares/ErrorHandlerMiddleware.js";
import cookieParser from "cookie-parser";
import { authenticateUser } from "./Middlewares/AuthMiddleware.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
app.use(json());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cookieParser());
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", authenticateUser, UserRouter);
app.use("/api/v1/orders", authenticateUser, OrderRouter);
app.use("/api/v1", FoodRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "success" });
});

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT;
app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log(`server running on ${port}`);
  } catch (error) {
    console.log("error in server js::: ", error);
  }
});
