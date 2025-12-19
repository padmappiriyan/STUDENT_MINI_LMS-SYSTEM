import { create } from "zustand";
import { quizAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useQuizStore = create((set, get) => ({
  quizzes: [],
  currentQuiz: null,
  attempts: [],
  isLoading: false,
  error: null,

  // Fetch quiz by ID
  fetchQuiz: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await quizAPI.getQuiz(id);
      const quiz = res.data.quiz || res.data;
      set({
        currentQuiz: quiz,
        isLoading: false,
      });
      return quiz;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      set({
        isLoading: false,
        error: errorMsg,
      });
      toast.error(errorMsg);
      throw error;
    }
  },

  // Create quiz
  createQuiz: async (quizData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await quizAPI.createQuiz(quizData);
      const newQuiz = res.data.quiz || res.data;
      set((state) => ({
        quizzes: [...state.quizzes, newQuiz],
        currentQuiz: newQuiz,
        isLoading: false,
      }));
      toast.success('Quiz created successfully');
      return newQuiz;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      set({
        isLoading: false,
        error: errorMsg,
      });
      toast.error(errorMsg);
      throw error;
    }
  },

  // Update quiz
  updateQuiz: async (id, quizData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await quizAPI.createQuiz({ ...quizData, _id: id });
      const updatedQuiz = res.data.quiz || res.data;
      set((state) => ({
        quizzes: state.quizzes.map((quiz) =>
          quiz._id === id ? updatedQuiz : quiz
        ),
        currentQuiz: state.currentQuiz?._id === id ? updatedQuiz : state.currentQuiz,
        isLoading: false,
      }));
      toast.success('Quiz updated successfully');
      return updatedQuiz;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      set({
        isLoading: false,
        error: errorMsg,
      });
      toast.error(errorMsg);
      throw error;
    }
  },

  // Submit quiz (student taking quiz)
  submitQuiz: async (submissionData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await quizAPI.submitQuiz(submissionData);
      const attempt = res.data.attempt || res.data;
      set((state) => ({
        attempts: [...state.attempts, attempt],
        isLoading: false,
      }));
      return attempt;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      set({
        isLoading: false,
        error: errorMsg,
      });
      toast.error(errorMsg);
      throw error;
    }
  },

  // Fetch user's quiz attempts
  fetchAttempts: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await quizAPI.getAttempts();
      const attempts = res.data.attempts || res.data;
      set({
        attempts: Array.isArray(attempts) ? attempts : [attempts],
        isLoading: false,
      });
      return attempts;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      set({
        isLoading: false,
        error: errorMsg,
      });
      toast.error(errorMsg);
      throw error;
    }
  },

  // Set current quiz (for viewing)
  setCurrentQuiz: (quiz) => {
    set({ currentQuiz: quiz });
  },

  // Clear current quiz
  clearCurrentQuiz: () => {
    set({ currentQuiz: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));

export const useQuizActions = () => {
  const {
    fetchQuiz,
    createQuiz,
    updateQuiz,
    submitQuiz,
    fetchAttempts,
    setCurrentQuiz,
    clearCurrentQuiz,
  } = useQuizStore();
  return {
    fetchQuiz,
    createQuiz,
    updateQuiz,
    submitQuiz,
    fetchAttempts,
    setCurrentQuiz,
    clearCurrentQuiz,
  };
};

export const useQuizStates = () => {
  const { quizzes, currentQuiz, attempts, isLoading, error } = useQuizStore();
  return {
    quizzes,
    currentQuiz,
    attempts,
    isLoading,
    error,
  };
};
