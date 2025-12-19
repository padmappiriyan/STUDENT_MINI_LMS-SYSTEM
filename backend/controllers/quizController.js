import Quiz from '../models/Quiz.js';
import QuizAttempt from '../models/QuizAttempt.js';
import Lesson from '../models/Lesson.js';
import { sendNotification } from '../utils/notificationSender.js';

export const createQuiz = async (req, res) => {
  try {
    const { title, description, lessonId, questions, passingScore } = req.body;

    const lesson = await Lesson.findById(lessonId).populate('course');
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    if (lesson.course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const quiz = new Quiz({
      title,
      description,
      lesson: lessonId,
      questions,
      passingScore,
    });

    await quiz.save();
    lesson.quiz = quiz._id;
    await lesson.save();

    res.status(201).json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('lesson');
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    console.log(quizId,answers);

    const quiz = await Quiz.findById(quizId);
    console.log(quiz);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Calculate score
    let correctAnswers = 0;
    answers.forEach((answer) => {
      // Assuming answer.questionId is the index in the array
      const question = quiz.questions[answer.questionId];
      if (
        question &&
        question.options[answer.selectedOption] &&
        question.options[answer.selectedOption].isCorrect
      ) {
        correctAnswers++;
      }
    });

    const score = correctAnswers;
    const percentage = (correctAnswers / quiz.questions.length) * 100;
    const passed = percentage >= quiz.passingScore;
   console.log(score);
   console.log(percentage);
   console.log(passed);

    const attempt = new QuizAttempt({
      quiz: quizId,
      student: req.user.id,
      answers,
      score,
      percentage,
      passed,
    });
      console.log(attempt);
    
    await attempt.save();
  

    // Send notification
    await sendNotification(req, {
      recipientId: req.user.id,
      type: 'quiz_result',
      title: 'Quiz Result',
      message: `You scored ${percentage.toFixed(1)}% on ${quiz.title}. ${passed ? 'Passed!' : 'Try again.'}`,
      relatedId: attempt._id,
    });

    res.status(201).json({
      success: true,
      attempt: {
        score,
        percentage,
        passed,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getQuizAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ student: req.user.id })
      .populate('quiz')
      .sort('-createdAt');

    res.status(200).json({ success: true, attempts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
