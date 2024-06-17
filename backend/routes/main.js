// //routes/main.js

const express = require("express");
const router = express.Router();
const faker = require("faker");
const { Product } = require("../models/product");
const Review = require("../models/review");


// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
};

// API call to generate fake data to populate the store
router.get("/generate-fake-data", async (req, res, next) => {
  try {
    for (let i = 0; i < 90; i++) {
      let product = new Product({
        category: faker.commerce.department(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: "https://via.placeholder.com/250?text=Product+Image"
      });
      await product.save();
    }
    res.send("Fake data generated successfully");
  } catch (err) {
    next(err);
  }
});

// GET /products/categories - Get a sorted list of all distinct categories
router.get("/products/categories", async (req, res, next) => {
  try {
    const categories = await Product.distinct("category").sort();
    res.send(categories);
  } catch (err) {
    next(err);
  }
});

// GET /products/:product - Get a specific product by its ID
router.get("/products/:product", async (req, res, next) => {
  try {
    const productId = req.params.product;
    const product = await Product.findById(productId).populate('reviews');
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// GET /products/:product/reviews - Get all reviews for a product with pagination
router.get("/products/:product/reviews", async (req, res, next) => {
  try {
    const productId = req.params.product;
    const perPage = 4;
    const page = parseInt(req.query.page) || 1;

    const product = await Product.findById(productId)
      .populate({
        path: "reviews",
        options: { skip: perPage * (page - 1), limit: perPage }
      });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product.reviews);
  } catch (err) {
    next(err);
  }
});

// POST /products - Create a new product
router.post("/products", async (req, res, next) => {
  try {
    const { category, name, price, image } = req.body;
    if (!category || !name || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const product = new Product({ category, name, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// POST /products/:product/reviews - Create a new review for a product
router.post("/products/:product/reviews", async (req, res, next) => {
  try {
    const productId = req.params.product;
    const { userName, text } = req.body;
    if (!userName || !text) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = new Review({ userName, text, product: productId });
    await review.save();

    product.reviews.push(review);
    await product.save();

    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
});

// DELETE /products/:product - Delete a product by its ID
router.delete("/products/:product", async (req, res, next) => {
  try {
    const productId = req.params.product;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await Review.deleteMany({ product: productId });

    res.json({ message: "Product and associated reviews deleted successfully" });
  } catch (err) {
    next(err);
  }
});

// DELETE /reviews/:review - Delete a review by its ID
router.delete("/reviews/:review", async (req, res, next) => {
  try {
    const reviewId = req.params.review;
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    await Product.updateOne({ reviews: reviewId }, { $pull: { reviews: reviewId } });

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    next(err);
  }
});

// // GET /products - Get products with optional filtering, sorting, and pagination
router.get("/products", async (req, res, next) => {
  try {
    const { category, price, query, page = 1, perPage = 9 } = req.query;

    let searchQuery = {};
    if (query) searchQuery.name = { $regex: new RegExp(query, "i") };
    if (category) searchQuery.category = category; // Include category filter

    let sortOptions = {};
    if (price === "highest") {
      sortOptions = { price: -1 }; // Sort by highest price
    } else if (price === "lowest") {
      sortOptions = { price: 1 }; // Sort by lowest price
    }

    const totalCount = await Product.countDocuments(searchQuery);
    const products = await Product.find(searchQuery)
      .sort(sortOptions)
      .skip((page - 1) * perPage)
      .limit(Number(perPage))
      .populate('reviews');

    res.json({ products, totalCount });
  } catch (err) {
    next(err);
  }
});

router.use(errorHandler);

module.exports = router;

