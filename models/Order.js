const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema(
  {
    username: { type: String },
    total: { type: Array },
    orderlist: { type: String },
    qty: { type: String },
    status: {
      type: String,
      default: 'pending'
    }
  }
)
module.exports = mongoose.model('Order', OrderSchema)
