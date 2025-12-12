import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { courseAPI } from '../../services/api';
import { FaBook } from 'react-icons/fa';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AvailableCourse = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const { isAuthenticated } = useAuth();
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
        <div className="container mx-auto w-full ">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-extrabold text-white">Available Courses</h2>
                <p className="text-gray-400 text-lg">
                    {courses.length} {courses.length === 1 ? 'course' : 'courses'}
                </p>
            </div>

            {/* Loading Spinner */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : courses.length === 0 ? (

                // No Courses
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">No Courses Available Yet</h3>
                    <p className="text-gray-500">Check back soon for new courses!</p>
                </div>

            ) : (

                // Course List
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-[#1f1f23] rounded-xl shadow-lg hover:shadow-2xl hover:border-blue-700 transition duration-300 overflow-hidden cursor-pointer border-2 border-transparent"
                            data-aos="fade-up"
                            onClick={() => handleCourseClick(course._id)}
                        >
                            {/* Image */}
                            <div className="h-48  flex items-center justify-center">
                                {course.image ? (
                                    <img
                                        src={`http://localhost:5000${course.image}`}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FaBook className="text-6xl text-white opacity-40" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-blue-400 mb-2">
                                    {course.title}
                                </h3>

                                <p className="text-gray-300 mb-4 line-clamp-2">
                                    {course.description}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                                    <span className="flex items-center gap-1">
                                        <FaBook /> {course.lessons?.length || 0} Lessons
                                    </span>
                                    <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                                        {course.category}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-500 mb-4">
                                    Instructor: {course.instructor?.firstName} {course.instructor?.lastName}
                                </p>

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCourseClick(course._id);
                                        }}
                                        className="flex-1 border-2 border-blue-600 hover:border-blue-800 text-white font-semibold py-2 rounded-lg transition"
                                    >
                                        View Details
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            startLearning(course._id);
                                        }}
                                        className="flex-1 flex justify-center gap-2 items-center text-green-500 hover:text-green-700 font-semibold py-2 rounded-lg transition"
                                    >
                                        Start Learning
                                        <FaArrowRightToBracket className="text-lg" />
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
