require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3003,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/order-service'
};
