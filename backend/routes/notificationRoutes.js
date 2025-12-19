import { Router } from 'express';
import { createNotification, getNotifications, markAsRead, markAllAsRead } from '../controllers/notificationController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/', authMiddleware, createNotification);
router.get('/', authMiddleware, getNotifications);
router.put('/:notificationId/read', authMiddleware, markAsRead);
router.put('/read-all', authMiddleware, markAllAsRead);

export default router;
