const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  }
},
{ timestamps: true });

const category = mongoose.model("category", categorySchema);

module.exports = category;
