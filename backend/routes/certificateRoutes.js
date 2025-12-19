import { Router } from 'express';
import { generateCertificate, getCertificates, getAllCertificates } from '../controllers/certificateController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/generate', authMiddleware, generateCertificate);
router.get('/', authMiddleware, getCertificates);
router.get('/all', authMiddleware, getAllCertificates);

export default router;
