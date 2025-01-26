const { Router } = require("express");
const authRouter = Router();
const { customError } = require("../utils/customError");
const { signup, signin } = require("../controllers/auth.controller");
//here there will be some kind of controller to manage authentication;
//let us first connect with the database then we will think about the contolere.

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

authRouter.use((req, res, next) => {
  try {
    throw customError(411, "Route not found!");
  } catch (err) {
    next(err);
  }
});

module.exports = authRouter;
