import { Request, Response } from 'express';
import { fetchExternalUsers } from '../services/usersService';

export const getExternalUsers = async (_req: Request, res: Response) => {
    try {
        const users = await fetchExternalUsers();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};