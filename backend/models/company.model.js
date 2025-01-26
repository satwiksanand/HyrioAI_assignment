const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  companyPassword: {
    type: String,
    required: true,
  },
  companyContact: {
    type: String,
    required: true,
  },
});

module.exports = {
  companySchema,
};
