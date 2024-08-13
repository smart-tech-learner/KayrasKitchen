import { verifyJWT } from "../Utils/TokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new Error("Authentication Invalid");

  try {
    const { userId, role } = verifyJWT(token);

    req.user = { userId, role };
    next();
  } catch (error) {
    console.log("error verifying user::: ", error);
  }
};
