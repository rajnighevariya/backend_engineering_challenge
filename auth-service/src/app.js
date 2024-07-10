const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const { port, mongoUri } = require('./config');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Auth Service running on port ${port}`);
  });
}).catch(err => console.error('Could not connect to MongoDB', err));
