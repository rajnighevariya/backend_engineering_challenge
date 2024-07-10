require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3002,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/product-service'
};
