import Course from '../models/Course.js';
//import Lesson from '../models/Lesson.js';
import Progress from '../models/Progress.js';
import { deleteImage } from '../middleware/upload.js';
import { sendNotification } from '../utils/notificationSender.js';
import User from '../models/User.js';

export const createCourse = async (req, res) => {
  try {
    const { title, description, category, duration } = req.body;

    // Get image path if uploaded
    const imagePath = req.file ? `/uploads/courses/${req.file.filename}` : null;

    const course = new Course({
      title,
      description,
      category: category || 'General',
      duration,
      instructor: req.user.id,
      image: imagePath,
    });

    await course.save();
    res.status(201).json({ success: true, course });
  } catch (error) {
    // Delete uploaded image if course creation fails
    if (req.file) {
      deleteImage(`/uploads/courses/${req.file.filename}`);
    }
    res.status(500).json({ error: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('instructor', 'firstName lastName email')
      .populate('lessons');
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'firstName lastName email')
      .populate('lessons');
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { title, description, category, duration } = req.body;
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this course' });
    }

    // Prepare update data
    const updateData = { title, description, category, duration };

    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (course.image) {
        deleteImage(course.image);
      }
      // Set new image path
      updateData.image = `/uploads/courses/${req.file.filename}`;
    }

    course = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({ success: true, course });
  } catch (error) {
    // Delete uploaded image if update fails
    if (req.file) {
      deleteImage(`/uploads/courses/${req.file.filename}`);
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this course' });
    }

    // Delete course image if exists
    if (course.image) {
      deleteImage(course.image);
    }

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    const user= await User.findById(req.user.id);
    


    // 1 Check if already enrolled(course side)
    const existingEnrollment = course.enrollments.find(
      (e) => e.student.toString() === req.user.id
    );

    if (existingEnrollment) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

     // 2️ Check if already enrolled (User side)
    if (user.enrolledCourses.includes(course._id)) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }
    
    // 3️ Add enrollment to course
    course.enrollments.push({ student: req.user.id });
    await course.save();

     // 4️ Add course to user
    user.enrolledCourses.push(course._id);
    await user.save();

    // Create progress tracker
    const progress = new Progress({
      student: req.user.id,
      course: course._id,
      totalLessons: course.lessons.length,
    });
    await progress.save();

    // Send notification to student
    await sendNotification(req, {
      recipientId: req.user.id,
      type: 'course_enrolled',
      title: 'Course Enrollment',
      message: `You have successfully enrolled in ${course.title}`,
      relatedId: course._id,
    });

    res.status(200).json({ success: true, message: 'Enrolled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const startedCourse = async (req, res) => {
  try {
    const userId = req.user.id; // logged-in user
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const enrollment = course.enrollments.find(
      (e) => e.student.toString() === userId
    );

    if (!enrollment) {
      return res.status(404).json({ message: "Not enrolled in this course" });
    }

    enrollment.status = "started";

    await course.save();

        // Send notification to student
    await sendNotification(req, {
      recipientId: req.user.id,
      type: 'Learning_started',
      title: 'Course started',
      message: `You have successfully Started to Learning to ${course.title}`,
      relatedId: course._id,
    });

    res.status(200).json({ 
      success: true,
      message: "Course started successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
