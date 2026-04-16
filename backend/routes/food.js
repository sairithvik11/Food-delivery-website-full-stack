const express = require('express');
const router = express.Router();
const Food = require('../models/food');

router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const food = new Food({ name, price, image });
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
