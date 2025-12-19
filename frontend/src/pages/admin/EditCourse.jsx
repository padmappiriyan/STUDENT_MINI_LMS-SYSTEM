import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourseStore } from '../../store/courseStore';
import { useLessonStore } from '../../store/lessonStore';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash, FaEdit, FaBook, FaClock, FaVideo, FaArrowLeft, FaListOl, FaCheckCircle } from 'react-icons/fa';
import lessonImage from '../../assets/AdminDashboard/Lesson.avif';

const AdminEditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Zustand stores
    const { currentCourse, isLoading, error, fetchCourseById } = useCourseStore();
    const { createLesson, deleteLesson, lessons} = useLessonStore();
    console.log(lessons);
    
    const [showAddLesson, setShowAddLesson] = useState(false);
    const [newLesson, setNewLesson] = useState({
        title: '',
        content: '',
        videoUrl: '',
        duration: '',
        order: 1,
    });
   

    useEffect(() => {
        loadCourseDetails();
    }, [id]);

    const loadCourseDetails = async () => {
        try {
            await fetchCourseById(id);
        } catch (error) {
            toast.error('Failed to load course details');
            navigate('/admin/courses');
        }
    };

    const handleAddLesson = async (e) => {
        e.preventDefault();
        try {
            const lessonData = {
                ...newLesson,
                courseId: id,
            };

            await createLesson(lessonData);
            setShowAddLesson(false);
            setNewLesson({
                title: '',
                content: '',
                videoUrl: '',
                duration: '',
                order: (currentCourse?.lessons?.length || 0) + 1,
            });
        } catch (error) {
            // Error handled by store
        }
    };

    const handleDeleteLesson = async (lessonId) => {
        if (window.confirm('Are you sure you want to delete this lesson?')) {
            try {
                await deleteLesson(lessonId);
            } catch (error) {
                // Error handled by store
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading course details...</p>
                </div>
            </div>
        );
    }

    if (!currentCourse) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaBook className="text-3xl text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h2>
                    <p className="text-gray-600 mb-4">The course you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/admin/courses')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    const courseLessons = currentCourse?.lessons || [];
    

    return (
        <div className="h-full w-full ">
            {/* Header */}
            <div className="">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            
                            <div className="h-8 w-px bg-gray-300"></div>
                            <div>
                                <h1 className="text-3xl font-bold text-blue-900">
                                    {currentCourse?.title}
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">
                                    Manage lessons and course content
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowAddLesson(!showAddLesson)}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                        >
                            <FaPlus className="text-sm" />
                            <span>Add New Lesson</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - Lessons */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Add Lesson Form */}
                        {showAddLesson && (
                            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden animate-slideDown">
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <FaPlus />
                                        Add New Lesson
                                    </h2>
                                </div>
                                <form onSubmit={handleAddLesson} className="p-6 space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Lesson Title
                                        </label>
                                        <input
                                            type="text"
                                            value={newLesson.title}
                                            onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                            placeholder="Enter lesson title"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Lesson Content
                                        </label>
                                        <textarea
                                            value={newLesson.content}
                                            onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                                            rows="5"
                                            placeholder="Describe the lesson content..."
                                            required
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <FaVideo className="text-blue-600" />
                                                Video URL (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                value={newLesson.videoUrl}
                                                onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                <FaClock className="text-blue-600" />
                                                Duration (minutes)
                                            </label>
                                            <input
                                                type="number"
                                                value={newLesson.duration}
                                                onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                placeholder="30"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowAddLesson(false)}
                                            className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transition-all cursor-pointer"
                                        >
                                            Save Lesson
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Lessons List */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <FaListOl className="text-blue-600" />
                                        Course Lessons
                                    </h2>
                                    <span className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full">
                                        {courseLessons.length} Lessons
                                    </span>
                                </div>
                            </div>

                            {courseLessons.length === 0 ? (
                                <div className="p-12 text-center">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaBook className="text-3xl text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No lessons yet</h3>
                                    <p className="text-gray-600 mb-4">Start building your course by adding lessons</p>
                                    <button
                                        onClick={() => setShowAddLesson(true)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Add First Lesson
                                    </button>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {courseLessons.map((lesson, index) => (
                                        <div
                                            key={lesson._id}
                                            className="p-6 hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Lesson Number Badge */}
                                                <div className="flex-shrink-0">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                                                        <span className="text-white font-bold text-lg">
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Lesson Details */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                        {lesson.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                        {lesson.content}
                                                    </p>
                                                    <div className="flex flex-wrap items-center gap-4">
                                                        {lesson.duration && (
                                                            <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                                                <FaClock className="text-blue-600" />
                                                                {lesson.duration} min
                                                            </span>
                                                        )}
                                                        {lesson.videoUrl && (
                                                            <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                                                <FaVideo className="text-blue-600" />
                                                                Video included
                                                            </span>
                                                        )}
                                                        {lesson.quiz && (
                                                            <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                                                                <FaCheckCircle />
                                                                Quiz added
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex-shrink-0 flex items-center gap-2">
                                                    <button
                                                        onClick={() => window.location.href = `/admin/lesson/${lesson._id}/quiz`}
                                                        className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium text-sm hover:bg-blue-100 transition-colors cursor-pointer"
                                                    >
                                                        {lesson.quiz ? 'Edit Quiz' : 'Add Quiz'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteLesson(lesson._id)}
                                                        className="p-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                                                        title="Delete lesson"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Image & Stats */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            {/* Course Image */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <img 
                                    src={lessonImage} 
                                    alt="Course Management"
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            {/* Course Stats */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Course Statistics</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                                <FaBook className="text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600">Total Lessons</p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {courseLessons.length}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                                <FaCheckCircle className="text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600">With Quizzes</p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {courseLessons.filter(l => l.quiz).length}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                                <FaClock className="text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600">Total Duration</p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {courseLessons.reduce((sum, l) => sum + (parseInt(l.duration) || 0), 0)} min
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Tips */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Quick Tips</h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">•</span>
                                        <span>Add quizzes to increase engagement</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">•</span>
                                        <span>Keep lessons focused and concise</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-600 mt-0.5">•</span>
                                        <span>Add video content for better learning</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default AdminEditCourse;
