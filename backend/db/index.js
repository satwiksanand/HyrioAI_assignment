const mongoose = require("mongoose");
const connectionString = process.env.CONNECTION_STRING;
const { companySchema } = require("../models/company.model");

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to the database successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

const companyModel = mongoose.model("company", companySchema);

module.exports = {
  companyModel,
};
