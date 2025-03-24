import { Router } from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController';
import upload from '../middlewares/upload';

const router = Router();

router.post('/', upload.single('file'), createTask); //added multer to process file upload before executing the service
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
