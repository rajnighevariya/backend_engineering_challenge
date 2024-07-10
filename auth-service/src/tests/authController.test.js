const mongoose = require('mongoose');
const User = require('../models/user');
const authController = require('../controllers/authController');
const httpMocks = require('node-mocks-http');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const testUser = {
  username: 'testUser',
  password: 'testPassword'
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
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Controller - Register', () => {
  it('should register a user successfully', async () => {
    bcrypt.hash.mockResolvedValue('hashedPassword');

    req.body = testUser;

    await authController.register(req, res);

    const response = res._getJSONData();
    expect(res.statusCode).toBe(201);
    expect(response.message).toBe('User registered successfully');
  });

  it('should return error if user already exists', async () => {
    const user = new User(testUser);
    await user.save();

    req.body = testUser;

    await authController.register(req, res);

    expect(res.statusCode).toBe(400);
  });
});

describe('Auth Controller - Login', () => {
  it('should log in a user successfully', async () => {
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    const user = new User({ ...testUser, password: hashedPassword });
    await user.save();

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockResolvedValue('token');

    req.body = testUser;

    await authController.login(req, res);

    const response = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(response.token).toBe('token');
  });

  it('should return error if password is incorrect', async () => {
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    const user = new User({ ...testUser, password: hashedPassword });
    await user.save();

    bcrypt.compare.mockResolvedValue(false);

    req.body = testUser;

    await authController.login(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().error).toBe('Invalid username or password');
  });
});
