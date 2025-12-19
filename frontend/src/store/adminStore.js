import { create } from 'zustand';
import { courseAPI, authAPI, certificateAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useAdminStore = create((set) => ({
  // State
  stats: {
    totalCourses: 0,
    totalStudents: 0,
    totalLessons: 0,
    certificatesIssued: 0,
  },
  recentCourses: [],
  loading: false,
  error: null,

  // Actions
  fetchAdminStats: async () => {
    set({ loading: true, error: null });
    try {
      const [coursesRes, usersRes, certsRes] = await Promise.all([
        courseAPI.getCourses(),
        authAPI.getAllUsers(),
        certificateAPI.getAllCertificates(),
      ]);

      const courses = coursesRes.data?.courses || coursesRes.data || [];
      const users = usersRes.data?.users || usersRes.data || [];
      const certificates = certsRes.data?.certificates || certsRes.data || [];

      const totalLessons = courses.reduce(
        (acc, curr) => acc + (curr.lessons ? curr.lessons.length : 0),
        0
      );

      const students = users.filter(user => user.role === 'student');

      set({
        stats: {
          totalCourses: courses.length,
          totalStudents: students.length,
          totalLessons,
          certificatesIssued: certificates.length,
        },
        recentCourses: courses.slice(0, 5),
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      const errorMessage = error.response?.data?.message || 'Failed to load admin stats';
      set({ 
        error: errorMessage,
        loading: false,
      });
      toast.error(errorMessage);
    }
  },

  resetError: () => set({ error: null }),
}));