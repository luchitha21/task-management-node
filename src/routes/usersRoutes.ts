import { Router } from 'express';
import { getExternalUsers } from '../controllers/usersController';

const router = Router();

router.get('/', getExternalUsers);
export default router;
