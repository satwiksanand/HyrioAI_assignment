const { customError } = require("../utils/customError");
const zod = require("zod");
const bcryptjs = require("bcryptjs");
const { compnayModel } = require("../db/index");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const signup = async (req, res, next) => {};

module.exports = {
  signup,
};
