const { Router } = require("express");
const authRouter = Router();
const { customError } = require("../utils");
//here there will be some kind of controller to manage authentication;

authRouter.use((req, res, next) => {
  try {
    throw customError(411, "Route not found!");
  } catch (err) {
    next(err);
  }
});

moduel.exports = authRouter;
