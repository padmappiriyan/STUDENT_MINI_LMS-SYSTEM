import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
console.log('API Base URL:', API_BASE);

const axiosInstance = axios.create({
  baseURL: API_BASE,
});

// Add token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => axiosInstance.post('/auth/login', { email, password }),
  register: (data) => axiosInstance.post('/auth/register', data),
  getCurrentUser: () => axiosInstance.get('/auth/me'),
  getAllUsers: () => axiosInstance.get('/auth/users'),
  getAllUserCourses:()=> axiosInstance.get('/auth/courses')
};

export const courseAPI = {
  getCourses: () => axiosInstance.get('/courses'),
  getCourseById: (id) => axiosInstance.get(`/courses/${id}`),
  createCourse: (data) => axiosInstance.post('/courses', data),
  updateCourse: (id, data) => axiosInstance.put(`/courses/${id}`, data),
  deleteCourse: (id) => axiosInstance.delete(`/courses/${id}`),
  enrollCourse: (id) => axiosInstance.post(`/courses/${id}/enroll`),
  startCourse: (id) => axiosInstance.post(`/courses/${id}/start`),
};

export const lessonAPI = {
  getLesson: (id) => axiosInstance.get(`/lessons/${id}`),
  createLesson: (data) => axiosInstance.post('/lessons', data),
  updateLesson: (id, data) => axiosInstance.put(`/lessons/${id}`, data),
  deleteLesson: (id) => axiosInstance.delete(`/lessons/${id}`),
};

export const quizAPI = {
  getQuiz: (id) => axiosInstance.get(`/quizzes/${id}`),
  createQuiz: (data) => axiosInstance.post('/quizzes', data),
  submitQuiz: (data) => axiosInstance.post('/quizzes/submit', data),
  getAttempts: () => axiosInstance.get('/quizzes/attempts/my'),
};

export const progressAPI = {
  updateProgress: (data) => axiosInstance.put('/progress', data),
  getProgress: (courseId) => axiosInstance.get(`/progress/${courseId}`),
  getAllProgress: () => axiosInstance.get('/progress'),
};

export const messageAPI = {
  sendMessage: (data) => axiosInstance.post('/messages', data),
  getMessages: (roomId) => axiosInstance.get(`/messages/${roomId}`),
  markAsRead: (messageId) => axiosInstance.put(`/messages/${messageId}/read`),
};

export const notificationAPI = {
  getNotifications: () => axiosInstance.get('/notifications'),
  markAsRead: (notificationId) => axiosInstance.put(`/notifications/${notificationId}/read`),
  markAllAsRead: () => axiosInstance.put('/notifications/read-all'),
};

export const certificateAPI = {
  generateCertificate: (courseId) =>
    axiosInstance.post('/certificates/generate', { courseId }),
  getCertificates: () => axiosInstance.get('/certificates'),
  getAllCertificates: () => axiosInstance.get('/certificates/all'),
};

export default axiosInstance;
