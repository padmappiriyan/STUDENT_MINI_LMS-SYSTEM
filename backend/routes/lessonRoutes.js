import { Router } from 'express';
import { createLesson, getLesson, updateLesson, deleteLesson } from '../controllers/lessonController.js';
import { adminMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/', adminMiddleware, createLesson);
router.get('/:id', getLesson);
router.put('/:id', adminMiddleware, updateLesson);
router.delete('/:id', adminMiddleware, deleteLesson);

export default router;
