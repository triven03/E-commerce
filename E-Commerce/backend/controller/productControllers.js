const Product = require("../models/Product");
const Category = require("../models/Category");

const getProducts = async (req, res) => {
  try {
    const data = await Product.find({});
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await Product.find({category:req.params.id});
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductByCategory
};
