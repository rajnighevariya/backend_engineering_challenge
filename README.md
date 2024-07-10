# Backend Engineering Challenge

## Project Structure

1. **User Authentication Service**
2. **Product Management Service**
3. **Order Processing Service**

## Services

### 1. User Authentication Service
1.1 User Authentication Service

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

- Prerequisites
  1.Docker installed on your local machine.
  2.Docker Compose installed.
  3.Git installed.
  Step 1: Clone the Repository
  git clone [<repository-url>](https://github.com/rajnighevariya/backend_engineering_challenge.git)
  cd [<repository-folder>](https://github.com/rajnighevariya/backend_engineering_challenge.git)

Step 2: Set Up Environment Variables
Step 3: Create Docker Compose File
Step 4: Dockerfile for Each Service
Step 5: Build and Run the Services
docker-compose up --build
Step 6: Access the Services
Step 7: Deploying to Cloud (AWS Example) \* Using Elastic Beanstalk 1. Install AWS CLI and Elastic Beanstalk CLI:
pip install awsebcli 2. Initialize Elastic Beanstalk:
eb init -p docker your-app-name 3. Create an Environment:
eb create your-environment-name 4. Deploy:
eb deploy
Step 8: Monitoring and Logging 1. Use tools like Prometheus and Grafana for monitoring. 2. Configure CloudWatch for logging and monitoring on AWS.
