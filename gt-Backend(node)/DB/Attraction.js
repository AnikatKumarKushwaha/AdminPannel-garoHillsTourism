const mongoose = require("mongoose");

const AttractionShema = new mongoose.Schema({
  name: String,
  description: String,
  img1: String,
  img2: String,
  category: String,
  fromtura: String,
  location: String,
  transportation: String,
  headerimage: String,
  nearesttown: String,
  map: String,
  direction: String,
});

module.exports = mongoose.model("attractions", AttractionShema);
