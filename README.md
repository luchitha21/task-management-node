# Task Service API

This Repository contains the Task Service to do crud operations with tasks and create aws resources(S3 and dynamoDB).

## Environment Variables

# Environment Variables for the Project

To run this project, you need to add the following environment variables to your `.env` file:

```env
DYNAMODB_TABLE=your_table_name
PORT=3000
S3_BUCKET=your_bucket_name
```

## Installation

In order to run this application you should have node and npm installed, as well as the AWS cli

## Prerequisites
Before running the application, you need to create the necessary AWS resources (DynamoDB table and S3 bucket). Run the following command:

```bash
./create-resource.sh <bucket_name> <table_name>
```

After installing and creating the aws resources run the below commands to start the application

```bash
  npm install
  npm run dev
```

Application will run on port 3000

# Managing AWS Credentials Securely

## Why Store AWS Credentials in `~/.aws` Instead of `.env`?

When working with AWS services, **do not** store your AWS Access Key and Secret Key inside an `.env` file. Instead, use AWS's **secure credentials management** system.

### Where Are AWS Credentials Stored?
AWS credentials should be saved in the `~/.aws` directory:

1. **Credentials File (`~/.aws/credentials`)**  
   Stores AWS Access Key and Secret Key securely.

2. **Config File (`~/.aws/config`)**  
   Stores default region and other settings.

### Example: `~/.aws/credentials`
```ini
[default]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY
```

# Future Work: Deploying to AWS ECR & Fargate

## Overview
In the future, we will deploy this application to **AWS Elastic Container Service (ECS) using Fargate**, which will allow us to run our containerized application without managing servers. The container image will be stored in **Amazon Elastic Container Registry (ECR)**.

## Steps to Deploy

### 1. Create an ECR Repository
We will create an **Amazon ECR repository** to store the Docker images. This will allow us to manage and version our application images efficiently.

### 2. Build and Push the Docker Image
After setting up the ECR repository, we will:
- Build a Docker image for our application.
- Tag the image to associate it with our ECR repository.
- Push the image to ECR for future deployments.

### 3. Create an ECS Cluster
We will create an **ECS Cluster** using AWS Fargate as the compute engine. This cluster will host our services without requiring EC2 instances.

### 4. Define an ECS Task Definition
A **Task Definition** will be created to specify:
- The container image from ECR.
- The CPU and memory requirements.
- The networking configuration.
- Any environment variables needed by the application.

### 5. Deploy an ECS Service
We will set up an **ECS Service** to:
- Run tasks based on the defined Task Definition.
- Ensure high availability by maintaining a desired number of running tasks.
- Manage task scaling based on demand.

### 6. Configure Networking and Load Balancer
To expose the application to the internet, we will:
- Use an **Application Load Balancer (ALB)** to route traffic.
- Set up **VPC, subnets, and security groups** to define network access.
- Assign a **public IP** if needed.

### 7. Automate the Deployment
To streamline future deployments, we will:
- Use **GitHub Actions** or AWS CodePipeline for CI/CD.

## deployment procedure

```markdown
![Deployment Architecture](/deploy.png)



