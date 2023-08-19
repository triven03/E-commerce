const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductByCategory
} = require("../controller/productControllers");

// get all products
router.get("/all", getProducts);

// get one product

router.get("/one:id", getProductById);

// get all products with same category

router.get("/Category:id", getProductByCategory);

module.exports = router;
