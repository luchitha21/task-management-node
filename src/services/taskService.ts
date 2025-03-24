import { v4 as uuidv4 } from 'uuid';
import Task from '../models/taskModel';
import { TaskData } from '../dto/create-task.dto';
import { generateUploadUrl, uploadFileToS3, deleteFileFromS3 } from './aws.service';
import logger from '../utils/logger';

export const createTask = async (data: TaskData, file?: Express.Multer.File) => {
    try {
        let uploadUrl
        if (file) {
            let signedUrl = await generateUploadUrl(file?.originalname, file?.mimetype);
            if (!signedUrl) {
                throw new Error("Failed to generate signed URL");
            }
            uploadUrl = await uploadFileToS3(signedUrl, file)
        }

        const task = new Task({
            id: uuidv4(),
            title: data?.title,
            description: data?.description,
            status: data?.status || 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            fileUrl: uploadUrl ? uploadUrl : null,
        });
        return task.save();
    } catch (error) {
        logger.error(error, "Failed to create task")
        throw new Error("Failed to create Task")
    }
};

export const getTasks = async () => Task.scan().exec();

export const getTaskById = async (id: string) => Task.get(id);

export const updateTask = async (id: string, data: Partial<TaskData>) => {
    return Task.update(id, { ...data, updatedAt: new Date().toISOString() });
};

export const deleteTask = async (id: string) => {
    try {
        const task = await Task.get(id);
        if (task?.fileUrl) {
            const fileKey = task.fileUrl.split('/').pop();
            await deleteFileFromS3(fileKey)
        }
        return Task.delete(id);
    } catch (error) {
        logger.error(error, "failed to delete task");
        throw new Error("failed to delete task");
    }
};
