const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');
const { port, mongoUri } = require('./config');

const app = express();

app.use(express.json());
app.use('/api/orders', orderRoutes);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Order Service running on port ${port}`);
  });
}).catch(err => console.error('Could not connect to MongoDB', err));
