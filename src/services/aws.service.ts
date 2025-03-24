import { S3, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import env from '../config/env';
import logger from '../utils/logger';

const s3 = new S3({});

export const generateUploadUrl = async (fileName: string, fileType: string) => {
    try {
        const params = {
            Bucket: env.s3Bucket,
            Key: `uploads/${fileName}`,
            ContentType: fileType,
        };

        let result = await getSignedUrl(s3, new PutObjectCommand(params), { expiresIn: 3600 });
        logger.info({}, "generated upload URL")
        return result
    } catch (error) {
        logger.error(error, "failed to generate signed URL")
        throw new Error("failed to generate signed URL")
    }
};

export const uploadFileToS3 = async (signedUrl: string, file: Express.Multer.File) => {
    try {
        const response = await fetch(signedUrl, {
            method: 'PUT',
            body: file.buffer,
            headers: { 'Content-Type': file.mimetype },
        });

        if (!response.ok) throw new Error('Failed to upload file to S3');

        return `https://${env.s3Bucket}.s3.amazonaws.com/uploads/${file.originalname}`;
    } catch (error) {
        logger.error(error, "failed to upload file to S3")
        throw new Error("failed to upload to S3")
    }
};

export const deleteFileFromS3 = async (fileKey: string) => {
    try {
        const command = new DeleteObjectCommand({
            Bucket: env.s3Bucket,
            Key: `uploads/${fileKey}`,
        });
        await s3.send(command);
        logger.info({ fileKey }, "File deleted from S3 successfully");
    } catch (error) {
        logger.error(error, "failed to delete file from S3");
        throw new Error("failed to delete file from S3");
    }
};
