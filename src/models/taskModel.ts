import dynamoose from 'dynamoose';
import env from '../config/env';

const taskSchema = new dynamoose.Schema({
    id: { type: String, hashKey: true },
    title: String,
    description: String,
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    createdAt: String,
    updatedAt: String,
    fileUrl: String
});

export default dynamoose.model(env.dynamoDBTable, taskSchema, {
    create: false,
    update: false,
});
