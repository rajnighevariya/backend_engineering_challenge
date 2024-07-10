require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/auth-service'
};
