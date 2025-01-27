const mongoose = require("mongoose");

const mobileVerificationSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
});

module.exports = {
  mobileVerificationSchema,
};
