const express = require("express");
const router = express.Router();
const {verifyUser} = require('../middleware/middleware')

const { createOrder ,showHistory ,getOrder} = require("../controller/orderController");

// Create
router.post("/:cartId", [verifyUser], createOrder);
router.get("/all", [verifyUser], showHistory);
router.get("/:orderId", [verifyUser], getOrder);


module.exports = router;
