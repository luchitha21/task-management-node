# Task Service API

This Repository contains the Task Service to do crud operations with tasks and create aws resources(S3 and dynamoDB).

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

DYNAMODB_TABLE= table name
PORT=3000
S3_BUCKET = your bucket name

aws credentials and secrets won't be saved in the .env file, s

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
region = us-east-1


