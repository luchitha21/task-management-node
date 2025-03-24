import dotenv from 'dotenv';
dotenv.config();

export default {
    region: process.env.AWS_REGION,
    dynamoDBTable: process.env.DYNAMODB_TABLE!,
    s3Bucket: process.env.S3_BUCKET!,
    PORT: process.env.PORT
};