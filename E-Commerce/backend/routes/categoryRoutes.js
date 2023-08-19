const express = require('express')
const {
    allCategories,
     addCategory,
} = require('../controller/categoryController');

const router = express.Router();



// @desc Get all categories
// @access Public
router.get("/", allCategories);

// @desc  add category 
router.post("/add", addCategory);


module.exports = router