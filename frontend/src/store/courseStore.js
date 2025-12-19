import { create } from "zustand";
import { courseAPI } from '../services/api';
import { persist } from "zustand/middleware";
import toast from 'react-hot-toast';

export const useCourseStore = create(
  persist(
    (set, get) => ({
      courses: [],
      currentCourse: null,
      isLoading: false,
      error: null,

      // Fetch all courses (for admin)
      fetchCourses: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await courseAPI.getCourses();
          set({
            courses: res.data.courses || res.data,
            isLoading: false,
          });
        } catch (error) {
          const errorMsg = error.response?.data?.message || error.message;
          set({
            isLoading: false,
            error: errorMsg,
          });
          toast.error(errorMsg);
        }
      },

      // Fetch single course by ID
      fetchCourseById: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const res = await courseAPI.getCourseById(id);
          set({
            currentCourse: res.data.course || res.data,
            isLoading: false,
          });
          return res.data.course || res.data;
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

      // Create new course
      createCourse: async (courseData) => {
        set({ isLoading: true, error: null });
        try {
          const res = await courseAPI.createCourse(courseData);
          const newCourse = res.data.course || res.data;
          set((state) => ({
            courses: [...state.courses, newCourse],
            isLoading: false,
          }));
          toast.success('Course created successfully');
          return newCourse;
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

      // Update course
      updateCourse: async (id, courseData) => {
        set({ isLoading: true, error: null });
        try {
          const res = await courseAPI.updateCourse(id, courseData);
          const updatedCourse = res.data.course || res.data;
          set((state) => ({
            courses: state.courses.map((course) =>
              course._id === id ? updatedCourse : course
            ),
            currentCourse: state.currentCourse?._id === id ? updatedCourse : state.currentCourse,
            isLoading: false,
          }));
          toast.success('Course updated successfully');
          return updatedCourse;
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

      // Delete course
      deleteCourse: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await courseAPI.deleteCourse(id);
          set((state) => ({
            courses: state.courses.filter((course) => course._id !== id),
            currentCourse: state.currentCourse?._id === id ? null : state.currentCourse,
            isLoading: false,
          }));
          toast.success('Course deleted successfully');
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

      // Add course to list (for students enrolling)
      addCourse: (course) => {
        set((state) => ({
          courses: [...state.courses, course],
        }));
      },

     

      // Clear current course
      clearCurrentCourse: () => {
        set({ currentCourse: null });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "course-store",
      partialize: (state) => ({
        courses: state.courses,
      }),
    }
  )
);

export const userCourseActions = () => {
  const {
    addCourse,
    fetchCourses,
    
    createCourse,
    updateCourse,
    deleteCourse,
  } = useCourseStore();
  return {
    addCourse,
    fetchCourses,
  
    createCourse,
    updateCourse,
    deleteCourse,
  };
};

export const userCourseStates = () => {
  const { courses, isLoading, error, currentCourse } = useCourseStore();
  return {
    courses,
    isLoading,
    error,
    currentCourse,
  };
};