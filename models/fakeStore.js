const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  externalId: Number,
  title: String,
  price: Number,
  description: String,
  image: String,
});

module.exports = mongoose.model("Product", productSchema);
