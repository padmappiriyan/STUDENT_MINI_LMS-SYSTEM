import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    lessonsCompleted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
    totalLessons: {
      type: Number,
      default: 0,
    },
    percentageCompleted: {
      type: Number,
      default: 0,
    },
    timeSpent: {
      type: Number,
      default: 0, // in minutes
    },
    quizAttempts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizAttempt',
      },
    ],
    certificateEarned: {
      type: Boolean,
      default: false,
    },
    certificateId: {
      type: String,
      default: null,
    },
    certificateEarnedAt: {
      type: Date,
      default: null,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Progress = mongoose.models.Progress || mongoose.model("Progress", progressSchema);
export default Progress;
