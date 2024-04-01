const mongoose = require("mongoose");

const RestPlaceShema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  category: String,
  nearby: String,
  address: String,
});

module.exports = mongoose.model("restplaces", RestPlaceShema);
