const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hash });

  await user.save();
  res.json(user);
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    "secret123"
  );

  res.json({ token });
});

module.exports = router;