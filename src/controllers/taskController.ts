import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

export const createTask = async (req: Request, res: Response) => {
    try {
        const task = await taskService.createTask(req.body, req.file);
        res.status(201).json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getTasks = async (_req: Request, res: Response) => {
    try {
        const tasks = await taskService.getTasks();
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        task ? res.json(task) : res.status(404).json({ message: 'Task not found' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const task = await taskService.updateTask(req.params.id, req.body);
        res.json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        await taskService.deleteTask(req.params.id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
