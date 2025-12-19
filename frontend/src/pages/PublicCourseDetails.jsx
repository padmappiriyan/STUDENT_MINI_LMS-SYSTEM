import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courseAPI } from '../services/api';
import toast from 'react-hot-toast';
import { FaBook, FaClock, FaUser, FaArrowLeft, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';
import {useCourseActions,useCourseStates} from "../store/userCourseStore";
const PublicCourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {userEnrollCourse} = useCourseActions();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuthStore();
    useEffect(() => {
        fetchCourseDetails();
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            const response = await courseAPI.getCourseById(id);
            setCourse(response.data.course);
        } catch (error) {
            console.error('Error fetching course:', error);
            toast.error('Failed to load course details');
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async(id) => {
        if(isAuthenticated){
            console.log(id);
               const res= await userEnrollCourse(id);
               console.log(res);
               if(res){
                   navigate("/student/dashboard");
               }
               else{
                 navigate("/login");
               }
        }
        else{
           toast('Please sign in to enroll in this course');
           navigate('/login', { state: { from: `/student/course/${id}` } });
        }
        
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
                    <Link to="/" className="text-blue-600 hover:underline">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-linear-to-r from-[#0f172a] to-[#00546c] text-white py-8">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition"
                    >
                        <FaArrowLeft /> Back to Home
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Course Image */}
                        <div className="lg:col-span-1">
                            {course.image ? (
                                <img
                                    src={`http://localhost:5000${course.image}`}
                                    alt={course.title}
                                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                                />
                            ) : (
                                <div className="w-full h-64 bg-white/10 rounded-lg flex items-center justify-center">
                                    <FaBook className="text-8xl text-white/30" />
                                </div>
                            )}
                        </div>

                        {/* Course Info */}
                        <div className="lg:col-span-2">
                            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                                {course.category}
                            </span>
                            <h1 className="text-4xl font-bold mt-4 mb-4">{course.title}</h1>
                            <p className="text-xl text-blue-100 mb-6">{course.description}</p>

                            <div className="flex flex-wrap gap-6 mb-6">
                                <div className="flex items-center gap-2">
                                    <FaUser className="text-blue-200" />
                                    <span>
                                        Instructor: {course.instructor?.firstName} {course.instructor?.lastName}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaBook className="text-blue-200" />
                                    <span>{course.lessons?.length || 0} Lessons</span>
                                </div>
                                {course.duration && (
                                    <div className="flex items-center gap-2">
                                        <FaClock className="text-blue-200" />
                                        <span>{course.duration} minutes</span>
                                    </div>
                                )}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={()=>handleEnroll(course._id)}
                                    className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-200 flex items-center gap-2 shadow-lg cursor-pointer"
                                >
                                    <FaUserPlus /> Enroll Now
                                </button>
                                <Link
                                    to="/login"
                                    className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition duration-200 flex items-center gap-2"
                                >
                                    <FaSignInAlt /> Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Course</h2>
                            <p className="text-gray-600 leading-relaxed">{course.description}</p>
                        </div>

                        {/* Lessons Preview */}
                        <div className="bg-[#0f172a]  rounded-lg shadow-md p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Course Curriculum</h2>

                            {course.lessons && course.lessons.length > 0 ? (
                                <div className="space-y-3">
                                    {course.lessons.map((lesson, index) => (
                                        <div
                                            key={lesson._id || index}
                                            className="flex items-center justify-between p-4 bg-[#015066] rounded-lg"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="bg-blue-100 text-blue-600 font-bold w-10 h-10 rounded-full flex items-center justify-center">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-white">
                                                        {lesson.title || `Lesson ${index + 1}`}
                                                    </h3>
                                                    {lesson.duration && (
                                                        <p className="text-sm text-white flex items-center gap-1">
                                                            <FaClock className="text-xs" /> {lesson.duration} min
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-gray-400">🔒</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    No lessons available yet. Check back soon!
                                </p>
                            )}

                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-blue-800 text-center">
                                    <strong>Sign in to unlock all lessons</strong> and start your learning journey!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Course Features</h3>

                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-600">
                                        {course.lessons?.length || 0} comprehensive lessons
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-600">Expert instructor guidance</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-600">Certificate upon completion</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-600">Learn at your own pace</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-600">Lifetime access</span>
                                </li>
                            </ul>

                            <button
                                onClick={handleEnroll}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 mb-3"
                            >
                                Start Learning
                            </button>

                            <Link
                                to="/register"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 block text-center"
                            >
                                Create Free Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicCourseDetails;
