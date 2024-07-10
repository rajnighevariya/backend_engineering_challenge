const mongoose = require('mongoose');
const Product = require('../models/product');
const productController = require('../controllers/productController');
const httpMocks = require('node-mocks-http');

const testProduct = {
  name: 'Test Product',
  description: 'This is a test product',
  price: 100,
  stock: 10,
  __v: 0
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
  await Product.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Product Controller - Update Product', () => {
  it('should update a product successfully', async () => {
    const product = new Product(testProduct);
    await product.save();

    req.params.id = product._id;
    req.body = { ...testProduct, name: 'Updated Product', __v: product.__v };

    await productController.updateProduct(req, res);

    const updatedProduct = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(updatedProduct.name).toBe('Updated Product');
  });

  it('should return conflict if version is outdated', async () => {
    const product = new Product(testProduct);
    await product.save();

    req.params.id = product._id;
    req.body = { ...testProduct, name: 'Updated Product', __v: product.__v - 1 };

    await productController.updateProduct(req, res);

    expect(res.statusCode).toBe(409);
    expect(res._getJSONData().error).toBe('Conflict: Outdated version');
  });
});
