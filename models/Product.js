const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    categories: { type: String },
    price: { type: String, required: true },
    img: { type: String, required: true }

  },
  { timestamps: true }
)
module.exports = mongoose.model('Product', ProductSchema)
