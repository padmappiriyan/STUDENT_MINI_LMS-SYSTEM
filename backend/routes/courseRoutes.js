import { Router } from 'express';
import { createCourse, getCourses, getCourseById, updateCourse, deleteCourse, enrollCourse,startedCourse } from '../controllers/courseController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';
import { uploadCourseImage } from '../middleware/upload.js';

const router = Router();

router.post('/', adminMiddleware, uploadCourseImage, createCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.put('/:id', adminMiddleware, uploadCourseImage, updateCourse);
router.delete('/:id', adminMiddleware, deleteCourse);
router.post('/:id/enroll', authMiddleware, enrollCourse);
router.post('/:id/start', authMiddleware, startedCourse);

export default router;
