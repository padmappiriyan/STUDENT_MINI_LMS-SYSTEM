import { Router } from 'express';
import { updateProgress, getProgress, getAllProgress } from '../controllers/progressController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.put('/', authMiddleware, updateProgress);
router.get('/:courseId', authMiddleware, getProgress);
router.get('/', authMiddleware, getAllProgress);

export default router;
