const mongoose = require("mongoose");

const TourOperatorSchema = new mongoose.Schema({
  name: String,
  title: String,
  address: String,
  contact: String,
  email: String,
  attraction: String,
});

module.exports = mongoose.model("touroperators", TourOperatorSchema);
