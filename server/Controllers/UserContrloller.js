import { UserModel } from "../Models/UserModel.js";

export const currentUser = async (request, response) => {
  const { userId } = request.user;

  if (!userId) throw new Error("Authentication Invalid");

  try {
    const user = await UserModel.findOne({ _id: userId }).select(
      "-password -createdAt -updatedAt -__v"
    );

    if (!user) throw new Error("User not found");

    return response.status(200).json({ status: "success", user: user });
  } catch (error) {
    console.log("error fetching current user::: ", error);
  }
};
