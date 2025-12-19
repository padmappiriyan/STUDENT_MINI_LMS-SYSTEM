import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseAPI } from '../../services/api';
import { FaBook } from 'react-icons/fa';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const AvailableCourse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseAPI.getCourses();
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const startLearning = (courseId) => {
    if (isAuthenticated) {
      navigate('/student/course/' + courseId);
    } else {
      toast.info('Please sign in to enroll in this course');
      navigate('/login', { state: { from: `/student/course/${courseId}` } });
    }
  };

  const handleCourseClick = (courseId) => {
    navigate('/courseDetails/' + courseId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-2">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Available Courses
        </h2>
        <p className="text-gray-600 text-lg">
          {courses.length} {courses.length === 1 ? 'course' : 'courses'}
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : courses.length === 0 ? (

        /* No Courses */
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
          <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No Courses Available Yet
          </h3>
          <p className="text-gray-500">
            Check back soon for new courses!
          </p>
        </div>

      ) : (

        /* Course Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={() => handleCourseClick(course._id)}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm 
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
              cursor-pointer overflow-hidden"
              data-aos="fade-up"
            >

              {/* Image */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {course.image ? (
                  <img
                    src={`http://localhost:5000${course.image}`}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaBook className="text-6xl text-gray-300" />
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="flex items-center gap-1 text-gray-500">
                    <FaBook /> {course.lessons?.length || 0} Lessons
                  </span>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {course.category}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-5">
                  Instructor:{" "}
                  <span className="font-medium text-gray-700">
                    {course.instructor?.firstName} {course.instructor?.lastName}
                  </span>
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCourseClick(course._id);
                    }}
                    className="flex-1 border border-blue-600 text-blue-600 
                    hover:bg-blue-50 font-semibold py-2 rounded-lg transition"
                  >
                    View Details
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startLearning(course._id);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 
                    bg-green-600 text-white hover:bg-green-700 
                    font-semibold py-2 rounded-lg transition"
                  >
                    Start Learning
                    <FaArrowRightToBracket />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCourse;

