# Backend Engineering Challenge

## Project Structure

1. **User Authentication Service**
2. **Product Management Service**
3. **Order Processing Service**

## Services

### 1. User Authentication Service

```bash
auth-service/
├── src/
│ ├── controllers/
│ │ └── authController.js
│ ├── models/
│ │ └── user.js
│ ├── routes/
│ │ └── authRoutes.js
│ ├── services/
│ │ └── authService.js
│ ├── app.js
│ └── config.js
├── .env
├── Dockerfile
├── package.json
```

### 2. Product Management Service

```bash
product-service/
├── src/
│ ├── controllers/
│ │ └── productController.js
│ ├── models/
│ │ └── product.js
│ ├── routes/
│ │ └── productRoutes.js
│ ├── services/
│ │ └── productService.js
│ ├── app.js
│ └── config.js
├── .env
├── Dockerfile
├── package.json
```

### 3. Order Processing Service

```bash
order-service/
├── src/
│ ├── controllers/
│ │ └── orderController.js
│ ├── models/
│ │ └── order.js
│ ├── routes/
│ │ └── orderRoutes.js
│ ├── services/
│ │ └── orderService.js
│ ├── app.js
│ └── config.js
├── .env
├── Dockerfile
├── package.json
```

# Deployment Instructions

## Prerequisites

1. Docker installed on your local machine.
2. Docker Compose installed.
3. Git installed.

## Step 1: Clone the Repository

```bash
git clone https://github.com/rajnighevariya/backend_engineering_challenge.git
cd backend_engineering_challenge

```

## Step 2: Set Up Environment Variables
```bash
# .env file

# MongoDB
MONGO_URI=mongodb://mongo:27017/ecommerce

# JWT Secret
JWT_SECRET=your_jwt_secret

# Service URLs
PRODUCT_SERVICE_URL=http://product-service:3001
ORDER_SERVICE_URL=http://order-service:3002
AUTH_SERVICE_URL=http://auth-service:3003

```

## Step 3: Create Docker Compose File

```bash
version: "3"
services:
  auth-service:
    build: ./auth-service
    environment:
      - PORT=3001
      - MONGO_URI=mongodb://mongo:27017/auth-service
      - JWT_SECRET=your_jwt_secret
    ports:
      - "3001:3001"
    depends_on:
      - mongo

  product-service:
    build: ./product-service
    environment:
      - PORT=3002
      - MONGO_URI=mongodb://mongo:27017/product-service
    ports:
      - "3002:3002"
    depends_on:
      - mongo

  order-service:
    build: ./order-service
    environment:
      - PORT=3003
      - MONGO_URI=mongodb://mongo:27017/order-service
    ports:
      - "3003:3003"
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - auth-service
      - product-service
      - order-service
```

## Step 4: Dockerfile for Each Service
```bash
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port and start the service
EXPOSE 3001
CMD [ "npm", "start" ]

```

## Step 5: Build and Run the Services

      ```bash
      docker-compose up --build
      ```
## Step 6: Access the Services

## Step 7: Deploying to Cloud (AWS Example)

Using Elastic Beanstalk

1. Install AWS CLI and Elastic Beanstalk CLI:
    ```bash
      pip install awsebcli
    ```
2. Initialize Elastic Beanstalk:
    ```bash
      eb init -p docker your-app-name
    ```
3. Create an Environment:
    ```bash
      eb create your-environment-name
    ```
4. Deploy:
    ```bash
      eb deploy
    ```

## Step 8: Monitoring and Logging

1. Use tools like Prometheus and Grafana for monitoring.
2. Configure CloudWatch for logging and monitoring on AWS.
