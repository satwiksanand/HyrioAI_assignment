const customError = require("../utils/customError");
const zod = require("zod");
const bcryptjs = require("bcryptjs");
const { companyModel } = require("../db/index");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const signupSchema = zod.object({
  companyName: zod.string().nonempty(),
  companyEmail: zod.string().email(),
  companyPassword: zod.string().min(6),
  companyContact: zod.string().min(10).max(10),
});

const signinSchema = zod.object({
  companyEmail: zod.string().email(),
  companyPassword: zod.string().min(6),
});

const signup = async (req, res, next) => {
  const details = {
    companyName: req.body.companyName,
    companyEmail: req.body.companyEmail,
    companyPassword: req.body.companyPassword,
    companyContact: req.body.companyContact,
  };
  try {
    if (!signupSchema.safeParse(details).success) {
      throw customError(400, "Invalid details!");
    }
    const company = await companyModel.findOne({
      companyEmail: details.companyEmail,
    });
    if (!company) {
      const hashedPassword = bcryptjs.hashSync(details.companyPassword, 10);
      details.companyPassword = hashedPassword;
      await companyModel.create(details);
      return res
        .status(201)
        .json({ message: "Company registered successfully!" });
    } else {
      throw customError(400, "Email already exists!");
    }
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  const details = {
    companyEmail: req.body.companyEmail,
    companyPassword: req.body.companyPassword,
  };
  try {
    if (!signinSchema.safeParse(details).success) {
      throw customError(400, "Invalid details!");
    }
    const company = await companyModel.findOne({
      companyEmail: details.companyEmail,
    });
    if (!company) {
      throw customError(400, "Invalid email or password!");
    }
    const isMatch = await bcryptjs.compare(
      details.companyPassword,
      company.companyPassword
    );
    if (!isMatch) {
      throw customError(400, "Invalid email or password!");
    }
    const token = jwt.sign({ companyEmail: company.companyEmail }, secretKey);
    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 25892000000),
        secure: true,
        sameSite: "None",
      })
      .json({
        message: "signin successful!",
      });
  } catch (err) {
    next(err);
  }
};

const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token").json({
      message: "signout successfull!",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  signin,
  signout,
};
