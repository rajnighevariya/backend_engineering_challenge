const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true, default: 'Pending' }
});

module.exports = mongoose.model('Order', orderSchema);
