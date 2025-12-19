import { Router } from 'express';
import { sendMessage, getMessages, markAsRead } from '../controllers/messageController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/', authMiddleware, sendMessage);
router.get('/:roomId', authMiddleware, getMessages);
router.put('/:messageId/read', authMiddleware, markAsRead);

export default router;
