import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { quizAPI } from "../../services/api";
import toast from "react-hot-toast";
import { useQuizActions, useQuizStates } from "../../store/quizStore";

const StudentQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { submitQuiz, fetchAttempts } = useQuizActions();
  const { attempts } = useQuizStates();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load attempts
  useEffect(() => {
    fetchAttempts();
  }, []);

  // Load quiz
  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const res = await quizAPI.getQuiz(id);
      setQuiz(res.data.quiz);

      const initialAnswers = {};
      res.data.quiz.questions.forEach((_, index) => {
        initialAnswers[index] = -1;
      });
      setAnswers(initialAnswers);
    } catch {
      toast.error("Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  // CHECK IF ALREADY ATTEMPTED
  const existingAttempt = attempts?.find(
    (attempt) => attempt.quiz?._id === id
  );

  // BLOCK QUIZ
  if (!loading && existingAttempt) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Quiz Already Attempted
          </h2>

          <p>Score: <b>{existingAttempt.score}</b></p>
          <p>Percentage: <b>{existingAttempt.percentage}%</b></p>

          <p
            className={`mt-2 font-bold ${
              existingAttempt.passed
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {existingAttempt.passed ? "PASSED" : "FAILED"}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded"
          >
            Back to Lesson
          </button>
        </div>
      </div>
    );
  }

  // SUBMIT
  const handleSubmit = async () => {
    const unanswered = Object.values(answers).some((a) => a === -1);
    if (unanswered) {
      toast.error("Answer all questions");
      return;
    }

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, selectedOption]) => ({
        questionId: Number(questionId),
        selectedOption,
      })
    );

    try {
      const attempt = await submitQuiz({
        quizId: id,
        answers: formattedAnswers,
      });

      setResult(attempt);
      setSubmitted(true);
    } catch {}
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!quiz) return <div className="p-8">Quiz not found</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>

      {!submitted ? (
        quiz.questions.map((q, qi) => (
          <div key={qi} className="mb-6">
            <h3 className="font-semibold">
              {qi + 1}. {q.text}
            </h3>

            {q.options.map((o, oi) => (
              <label key={oi} className="block">
                <input
                  type="radio"
                  checked={answers[qi] === oi}
                  onChange={() =>
                    setAnswers({ ...answers, [qi]: oi })
                  }
                />
                {o.text}
              </label>
            ))}
          </div>
        ))
      ) : (
        <div>
          <h2>Score: {result.score}</h2>
          <h2>{result.percentage}%</h2>
        </div>
      )}

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
};

export default StudentQuiz;
