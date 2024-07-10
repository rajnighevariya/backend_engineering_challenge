const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const { port, mongoUri } = require('./config');
const rateLimit = require('express-rate-limit');

const app = express();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Apply to all requests
app.use(limiter);

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
