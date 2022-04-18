const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema(
  {
    username: { type: String },
    telephone: { type: String },
    price: { type: Array },
    room: { type: String },
    total: { type: Array },
    orderlist: { type: Array },
    qty: { type: Array },
    cart: { type: String },
    status: {
      type: String,
      default: 'pending'
    }
  }
)
module.exports = mongoose.model('Order', OrderSchema)
