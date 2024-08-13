import { UserModel } from "../Models/UserModel.js";
import { comparePassword, hashPassword } from "../Utils/PasswordUtils.js";
import { createJWT } from "../Utils/TokenUtils.js";

export const register = async (request, response) => {
  const { password } = request.body;
  try {
    const hashedPassword = await hashPassword(password);
    request.body.password = hashedPassword;
    await UserModel.create(request.body);
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Error occurred during registration:::", error });
  }
  return response.status(201).json({ status: "success" });
};

export const login = async (request, response) => {
  const { email, password } = request.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return response
      .status(400)
      .json({ status: "error", msg: "User not registered" });
  }

  const passwordMatch = await comparePassword(password, user?.password);

  if (!passwordMatch) {
    return response
      .status(400)
      .json({ status: "error", msg: "Incorrect password" });
  }

  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 24 * 60 * 60 * 1000;

  response.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  return response.status(200).json({ status: "success", token: token });
};

export const logout = (request, response) => {
  response.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  response.status(200).json({ status: "success" });
};
