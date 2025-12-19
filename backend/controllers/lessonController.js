import Lesson from '../models/Lesson.js';
import Course from '../models/Course.js';

import { sendNotification } from '../utils/notificationSender.js';

export const createLesson = async (req, res) => {
  try {
    const { title, content, videoUrl, order, courseId, duration } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const lesson = new Lesson({
      title,
      content,
      videoUrl,
      order,
      course: courseId,
      duration,
    });

    await lesson.save();
    course.lessons.push(lesson._id);
    await course.save();

    // Notify enrolled students
    for (const enrollment of course.enrollments) {
      await sendNotification(req, {
        recipientId: enrollment.student,
        type: 'lesson_published',
        title: 'New Lesson Published',
        message: `A new lesson "${title}" has been added to ${course.title}`,
        relatedId: course._id,
      });
    }

    res.status(201).json({ success: true, lesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('quiz');
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.status(200).json({ success: true, lesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const { title, content, videoUrl, duration } = req.body;
    let lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const course = await Course.findById(lesson.course);
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      { title, content, videoUrl, duration },
      { new: true }
    );

    res.status(200).json({ success: true, lesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    const course = await Course.findById(lesson.course);
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    course.lessons = course.lessons.filter((id) => id.toString() !== req.params.id);
    await course.save();
    await Lesson.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Lesson deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
