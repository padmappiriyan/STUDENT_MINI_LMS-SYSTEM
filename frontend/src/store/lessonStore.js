import { create } from 'zustand';
import { lessonAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useLessonStore = create((set, get) => ({
  lessons: [],
  currentLesson: null,
  isLoading: false,
  error: null,

  // Fetch lessons for a course
  fetchLessonsByCourse: async (courseId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await lessonAPI.getLessonsByCourse(courseId);
      const lessonData = response.data?.lessons || response.data || [];
      set({ lessons: lessonData, isLoading: false });
      return lessonData;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch lessons';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Create lesson
  createLesson: async (lessonData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await lessonAPI.createLesson(lessonData);
      const newLesson = response.data?.lesson || response.data;
      
      set((state) => ({
        lessons: [...state.lessons, newLesson],
        isLoading: false,
      }));
      
      toast.success('Lesson created successfully');
      return newLesson;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create lesson';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Update lesson
  updateLesson: async (lessonId, lessonData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await lessonAPI.updateLesson(lessonId, lessonData);
      const updatedLesson = response.data?.lesson || response.data;
      
      set((state) => ({
        lessons: state.lessons.map(l => l._id === lessonId ? updatedLesson : l),
        currentLesson: updatedLesson,
        isLoading: false,
      }));
      
      toast.success('Lesson updated successfully');
      return updatedLesson;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update lesson';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Delete lesson
  deleteLesson: async (lessonId) => {
    set({ isLoading: true, error: null });
    try {
      await lessonAPI.deleteLesson(lessonId);
      
      set((state) => ({
        lessons: state.lessons.filter(l => l._id !== lessonId),
        isLoading: false,
      }));
      
      toast.success('Lesson deleted successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete lesson';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Fetch single lesson
  fetchLessonById: async (lessonId) => {
    set({ isLoading: true, error: null });
    try {
      
      const response = await lessonAPI.getLesson(lessonId);
      const lesson = response.data?.lesson || response.data;
      set({ currentLesson: lesson, isLoading: false });
      return lesson;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch lesson';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Reorder lessons
  reorderLessons: async (courseId, lessonIds) => {
    set({ isLoading: true, error: null });
    try {
      await lessonAPI.reorderLessons(courseId, lessonIds);
      
      // Re-fetch lessons to get updated order
      const response = await lessonAPI.getLessonsByCourse(courseId);
      const lessonData = response.data?.lessons || response.data || [];
      set({ lessons: lessonData, isLoading: false });
      
      toast.success('Lessons reordered successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to reorder lessons';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  resetError: () => set({ error: null }),
}));