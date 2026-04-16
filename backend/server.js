const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/food');
const orderRoutes = require('./routes/Order');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/order', orderRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thvik_aroma';

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));