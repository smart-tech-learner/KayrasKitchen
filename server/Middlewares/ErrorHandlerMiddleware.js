const errorHandlerMiddleware = (err, req, res, next) => {
  const msg = err.message || "something went wrong, please try again!";
  return res.status(500).json({ msg });
};

export default errorHandlerMiddleware;
