const CategoryModel = require("../models/Category");


//  @desc Add new Category
exports.addCategory = (req, res) => {
  console.log(req.body);
  CategoryModel.create(req.body)
    .then((category) => {
      res.status(201).json({ data: category });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// @desc Get List of Categories
exports.allCategories = (req, res) => {
  CategoryModel.find()
    .exec((err, categories) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      res.json({
        categories: categories,
      });
    });
};


