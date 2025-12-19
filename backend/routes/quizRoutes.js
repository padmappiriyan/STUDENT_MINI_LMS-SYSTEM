import { Router } from 'express';
import { createQuiz, getQuiz, submitQuiz, getQuizAttempts } from '../controllers/quizController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/', adminMiddleware, createQuiz);
router.get('/:id', getQuiz);
router.post('/submit', authMiddleware, submitQuiz);
router.get('/attempts/my', authMiddleware, getQuizAttempts);

export default router;
