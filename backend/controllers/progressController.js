import  Progress from '../models/Progress.js';


export const updateProgress = async (req, res) => {
  try {
    const { courseId, lessonId, timeSpent } = req.body;

    let progress = await Progress.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (!progress) {
      return res.status(404).json({ error: 'Progress record not found' });
    }

    // Mark lesson as completed
    if (!progress.lessonsCompleted.includes(lessonId)) {
      progress.lessonsCompleted.push(lessonId);
    }

    progress.timeSpent += timeSpent || 0;
    progress.percentageCompleted =
      (progress.lessonsCompleted.length / progress.totalLessons) * 100;

    await progress.save();

    res.status(200).json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    const progress = await Progress.findOne({
      student: req.user.id,
      course: courseId,
    }).populate('lessonsCompleted');

    if (!progress) {
      return res.status(404).json({ error: 'Progress record not found' });
    }

    res.status(200).json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProgress = async (req, res) => {
  try {
    const progressRecords = await Progress.find({ student: req.user.id })
      .populate('course')
      .populate('lessonsCompleted');

    res.status(200).json({ success: true, progress: progressRecords });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
