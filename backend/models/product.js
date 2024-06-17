//models/product.js
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const ProductSchema = new Schema({
//   category: String,
//   name: String,
//   price: Number,
//   image: String,
// });

// //module.exports = mongoose.model("Product", ProductSchema);
// const Product = mongoose.model("Product", ProductSchema);
// module.exports = { Product } ;

const mongoose = require("mongoose");
//const Review = require("./review");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };