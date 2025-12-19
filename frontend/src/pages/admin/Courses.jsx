import React, { useEffect } from 'react';
import { useCourseStore } from '../../store/courseStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminCourses = () => {
  const navigate = useNavigate();
  const { courses, isLoading, fetchCourses, deleteCourse } = useCourseStore();

  // 🔹 Get course image dynamically
  const getCourseImage = (course) => {
    if (course.thumbnail) return `http://localhost:5000${course.thumbnail}`;
    if (course.image) return `http://localhost:5000${course.image}`;
    return "/default-course.jpg"; // default image
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      await fetchCourses();
    } catch (error) {
      toast.error("Failed to load courses");
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId);
        toast.success("Course deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete course");
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading courses...
      </div>
    );

  return (
    <div className="p-8 h-full w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-blue-800">My Courses</h1>
          <button
            onClick={() => navigate('/admin/create-course')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow transition"
          >
            + Create Course
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {courses.map((course) => (
            <div
              key={course._id}
              className="relative rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden h-64 flex flex-col justify-end"
              data-aos="fade-left"
            >
              {/* Course Image with Gradient */}
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url(${getCourseImage(course)})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>

              {/* Course Info */}
              <div className="relative z-10 p-6 flex flex-col flex-1 justify-end text-white">
                <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                <p className="text-sm mb-2 line-clamp-3">{course.description || "No description available."}</p>
                <p className="text-xs mb-4">Lessons: {course.lessons?.length || 0}</p>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => navigate(`/admin/course/${course._id}/edit`)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Courses */}
        {courses.length === 0 && (
          <p className="text-center text-gray-600 mt-12 text-lg">
            No courses yet. Create one to get started!
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;
