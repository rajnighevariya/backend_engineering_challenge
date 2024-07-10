const mongoose = require('mongoose');
const Order = require('../models/order');
const orderController = require('../controllers/orderController');
const httpMocks = require('node-mocks-http');
const axios = require('axios');


jest.mock('axios');


const testOrder = {
  userId: 'testUserId',
  products: [{ productId: 'testProductId', quantity: 2 }],
  totalAmount: 200
};

let req, res;

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
});

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

afterEach(async () => {
  await Order.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Order Controller - Create Order', () => {
  it('should create an order successfully', async () => {
    axios.get.mockResolvedValue({ data: { stock: 10 } });
    axios.put.mockResolvedValue({});

    req.body = testOrder;

    await orderController.createOrder(req, res);

    const createdOrder = res._getJSONData();
    expect(res.statusCode).toBe(201);
    expect(createdOrder.message).toBe('Order created successfully');
  });

  it('should return error if not enough stock', async () => {
    axios.get.mockResolvedValue({ data: { stock: 1 } });

    req.body = testOrder;

    await orderController.createOrder(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toBe('Not enough stock for product undefined');
  });
});
