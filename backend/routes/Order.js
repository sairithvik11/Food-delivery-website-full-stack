const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const order = new Order({
    userId: req.user.id,
    items: req.body.items,
    total: req.body.total,
    address: req.body.address
  });

  await order.save();
  res.json({ msg: "Order placed" });
});

router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

router.delete('/:id', auth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
  if (!order) return res.status(404).json({ msg: "Order not found" });
  await order.deleteOne();
  res.json({ msg: "Cancelled" });
});

module.exports = router;