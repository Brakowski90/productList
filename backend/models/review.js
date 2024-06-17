// models/review.js

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const ReviewSchema = new Schema({
//   userName: String,
//   text: String,
//   product: { type: Schema.Types.ObjectId, ref: "Product" } // Reference  Product model
// });

// module.exports = mongoose.model("Review", ReviewSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = { Review };