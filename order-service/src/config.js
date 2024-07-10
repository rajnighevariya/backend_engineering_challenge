require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3003,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/order-service',
  productServiceUrl: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002'
};
