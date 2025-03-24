#!/bin/bash

# Define CloudFormation template file
TEMPLATE_FILE="task-resources.yaml"

# Stack name
STACK_NAME="TaskResourcesStack"

# Define BucketName and TableName 
BUCKET_NAME=${1:-"luchithabucket21"}  # Default if not passed as an argument
TABLE_NAME=${2:-"Tasks"}    # Default if not passed as an argument

# Check if the stack exists
STACK_STATUS=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].StackStatus" --output text 2>/dev/null)

if [[ "$STACK_STATUS" == "ROLLBACK_COMPLETE" ]]; then
    echo "Stack is in ROLLBACK_COMPLETE state. Deleting it..."
    aws cloudformation delete-stack --stack-name $STACK_NAME
    echo "Waiting for stack to be deleted..."
    aws cloudformation wait stack-delete-complete --stack-name $STACK_NAME
fi

# Deploy the stack with parameter overrides
aws cloudformation deploy \
  --template-file $TEMPLATE_FILE \
  --stack-name $STACK_NAME \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides BucketName=$BUCKET_NAME TableName=$TABLE_NAME

echo "CloudFormation stack deployed successfully."
