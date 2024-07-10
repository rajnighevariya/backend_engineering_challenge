const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const { port, mongoUri } = require('./config');

const app = express();

app.use(express.json());
app.use('/api/products', productRoutes);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Product Service running on port ${port}`);
  });
}).catch(err => console.error('Could not connect to MongoDB', err));
