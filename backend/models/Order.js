const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  total: Number,
  address: String,
  status: { type: String, default: "Preparing" }
});

module.exports = mongoose.model('Order', orderSchema);