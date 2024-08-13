import brcypt from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await brcypt.genSalt(10);
  const hashedPassword = await brcypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await brcypt.compare(password, hashedPassword);
  return isMatch;
};
