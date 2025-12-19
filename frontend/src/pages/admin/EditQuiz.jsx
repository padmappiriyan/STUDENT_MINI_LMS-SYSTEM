import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLessonStore } from '../../store/lessonStore';
import { useQuizActions, useQuizStates } from '../../store/quizStore';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash, FaSave, FaArrowLeft } from 'react-icons/fa';

const AdminEditQuiz = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  // Lesson store
  const { currentLesson, fetchLessonById, isLoading: lessonLoading } = useLessonStore();

  // Quiz store
  const { currentQuiz, isLoading: quizLoading } = useQuizStates();
  const { fetchQuiz, createQuiz, updateQuiz, clearCurrentQuiz } = useQuizActions();

  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    passingScore: 70,
    questions: [],
  });

  // Load lesson & quiz on mount
  useEffect(() => {
    loadData();
    return () => clearCurrentQuiz(); // clear current quiz when leaving
  }, [lessonId]);

  const loadData = async () => {
    try {
      // Fetch lesson
      const lesson = await fetchLessonById(lessonId);

      // If lesson has an existing quiz, fetch it
      if (lesson.quiz?._id) {
        const quiz = await fetchQuiz(lesson.quiz._id);
        setQuizData({
          title: quiz.title,
          description: quiz.description,
          passingScore: quiz.passingScore,
          questions: quiz.questions,
        });
      } else {
        // No existing quiz, create default
        setQuizData({
          title: `${lesson.title} Quiz`,
          description: '',
          passingScore: 70,
          questions: [
            {
              text: '',
              options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
              ],
              explanation: '',
            },
          ],
        });
      }
    } catch {
      toast.error('Failed to load lesson or quiz data');
    }
  };

  // Handle changes
  const handleQuestionChange = (qIndex, field, value) => {
    const newQuestions = [...quizData.questions];
    newQuestions[qIndex][field] = value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, field, value) => {
    const newQuestions = [...quizData.questions];
    newQuestions[qIndex].options[oIndex][field] = value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          text: '',
          options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
          ],
          explanation: '',
        },
      ],
    });
  };

  const removeQuestion = (index) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.filter((_, i) => i !== index),
    });
  };

  const addOption = (qIndex) => {
    const newQuestions = [...quizData.questions];
    newQuestions[qIndex].options.push({ text: '', isCorrect: false });
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const removeOption = (qIndex, oIndex) => {
    const newQuestions = [...quizData.questions];
    newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, i) => i !== oIndex);
    setQuizData({ ...quizData, questions: newQuestions });
  };

  // Submit (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!quizData.title) return toast.error('Quiz title is required');
    if (!quizData.questions.length) return toast.error('Add at least one question');

    for (let i = 0; i < quizData.questions.length; i++) {
      if (!quizData.questions[i].text)
        return toast.error(`Question ${i + 1} text is required`);
      if (!quizData.questions[i].options.some(o => o.isCorrect))
        return toast.error(`Question ${i + 1} needs a correct answer`);
    }

    try {
      if (currentQuiz?._id) {
        // Update existing quiz
        await updateQuiz(currentQuiz._id, { ...quizData, lessonId });
        toast.success('Quiz updated successfully');
      } else {
        // Create new quiz
        await createQuiz({ ...quizData, lessonId });
      }
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  if (lessonLoading || quizLoading) return <div className="p-10">Loading...</div>;

  return (
    <div className="h-full w-full p-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-black"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl text-blue-800 font-bold">
            Manage Quiz – {currentLesson?.title}
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT COLUMN */}
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <h2 className="font-semibold text-lg border-b text-blue-800 pb-2">Quiz Details</h2>
              <input
                type="text"
                value={quizData.title}
                onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
                placeholder="Quiz title"
                className="w-full border border-gray-400/50 rounded-lg p-2"
              />
              <textarea
                rows="3"
                value={quizData.description}
                onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
                placeholder="Description"
                className="w-full border rounded-lg p-2 border-gray-400/50"
              />
              <input
                type="number"
                value={quizData.passingScore}
                onChange={(e) =>
                  setQuizData({ ...quizData, passingScore: parseInt(e.target.value) })
                }
                className="w-full border rounded-lg p-2 border-gray-400/50"
                placeholder="Passing Score"
              />
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {quizData.questions.map((question, qIndex) => (
                <div key={qIndex} className="bg-white rounded-xl shadow p-6 relative">
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="absolute top-4 right-4 text-red-500"
                  >
                    <FaTrash />
                  </button>

                  <h3 className="font-semibold mb-3 text-blue-800">Question {qIndex + 1}</h3>

                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                    className="w-full border rounded-lg p-2 mb-3 border-gray-400/50"
                    placeholder="Question text"
                  />

                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex gap-2 mb-2">
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        checked={option.isCorrect}
                        onChange={() => {
                          const newQuestions = [...quizData.questions];
                          newQuestions[qIndex].options.forEach(
                            (o, i) => (o.isCorrect = i === oIndex)
                          );
                          setQuizData({ ...quizData, questions: newQuestions });
                        }}
                      />
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, 'text', e.target.value)}
                        className="flex-1 border rounded-lg p-2 border-gray-400/50"
                        placeholder={`Option ${oIndex + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(qIndex, oIndex)}
                        className="text-red-400"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addOption(qIndex)}
                    className="text-blue-600 text-sm"
                  >
                    + Add Option
                  </button>

                  <input
                    type="text"
                    value={question.explanation}
                    onChange={(e) => handleQuestionChange(qIndex, 'explanation', e.target.value)}
                    className="w-full border rounded-lg p-2 mt-3 border-gray-400/50"
                    placeholder="Explanation (optional)"
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={addQuestion}
                className="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <FaPlus /> Add Question
              </button>
            </div>
          </div>

          {/* SAVE */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center gap-2"
            >
              <FaSave /> Save Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditQuiz;
