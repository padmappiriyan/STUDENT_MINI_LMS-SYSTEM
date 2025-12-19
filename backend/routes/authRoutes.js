import { Router } from 'express';
import { register, login, getCurrentUser, getAllUsers,getUserCourses  } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getCurrentUser);
router.get('/users', authMiddleware, getAllUsers);
router.get('/courses',authMiddleware,getUserCourses);

export default router;
