import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaUsers,
  FaGraduationCap,
  FaCertificate,
  FaPlus,
  FaComments,
} from "react-icons/fa";
import { useAdminStore } from "../../store/adminStore";
import manageCourse from "../../assets/AdminDashboard/manageCourse.png";
import addCourse from "../../assets/AdminDashboard/image.png";
import chatBg from "../../assets/AdminDashboard/OpenChat.webp";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { stats, recentCourses, loading, fetchAdminStats } = useAdminStore();

  useEffect(() => {
    fetchAdminStats();
  }, [fetchAdminStats]);

  console.log(recentCourses);

  const getCourseImage = (course) => {
    if (course.thumbnail) return `http://localhost:5000${course.thumbnail}`;
    if (course.image) return `http://localhost:5000${course.image}`;
    return "/default-course.jpg";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: FaBook,
      color: "blue",
      link: "/admin/courses",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: FaUsers,
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Total Lessons",
      value: stats.totalLessons,
      icon: FaGraduationCap,
      color: "purple",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      title: "Certificates Issued",
      value: stats.certificatesIssued,
      icon: FaCertificate,
      color: "yellow",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-200",
    },
  ];

  return (
    <div className="h-full w-full p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Here's what's happening with your platform.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/create-course")}
            className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition duration-200 shadow-lg cursor-pointer"
          >
            <FaPlus /> Create New Course
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                onClick={() => stat.link && navigate(stat.link)}
                className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                  stat.borderColor
                } ${
                  stat.link
                    ? "cursor-pointer hover:shadow-lg transition duration-200 transform hover:scale-105"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className={`text-4xl font-bold ${stat.textColor}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.bgColor} p-4 rounded-full`}>
                    <Icon className={`text-3xl ${stat.textColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            data-aos="fade-left"
          >
            {/* ===== Manage Courses ===== */}
            <div
              className="relative rounded-lg overflow-hidden bg-cover bg-center min-h-[200px]"
              style={{ backgroundImage: `url(${manageCourse})` }}
            >
              <div className="bg-black/50 p-6 h-full flex items-center justify-center">
                <button
                  onClick={() => navigate("/admin/courses")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <FaBook /> Manage Courses
                </button>
              </div>
            </div>

            {/* ===== Add New Course ===== */}
            <div
              className="relative rounded-lg overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url(${addCourse})` }}
            >
              <div className="bg-black/50 p-6 h-full flex items-center justify-center">
                <button
                  onClick={() => navigate("/admin/create-course")}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2"
                >
                  <FaPlus /> Add New Course
                </button>
              </div>
            </div>

            {/* ===== Open Chat ===== */}
            <div
              className="relative rounded-lg overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url(${chatBg})` }}
            >
              <div className="bg-black/50 p-6 h-full flex items-center justify-center">
                <button
                  onClick={() => navigate("/admin/chat")}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2"
                >
                  <FaComments /> Open Chat
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Courses */}
        <div className=" p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Courses</h2>
            <button
              onClick={() => navigate("/admin/courses")}
              className="text-blue-600 hover:text-blue-800 font-semibold transition"
            >
              View All →
            </button>
          </div>

          {recentCourses.length === 0 ? (
            <p className="text-gray-500 text-center py-12">
              No courses created yet. Create your first course!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentCourses.map((course) => (
                <div
                  key={course._id}
                  onClick={() => navigate(`/admin/course/${course._id}/edit`)}
                  className="relative h-56 rounded-xl overflow-hidden cursor-pointer group shadow-lg"
                  data-aos="fade-left"
                  style={{
                    backgroundImage: `url(${getCourseImage(course)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition" />

                  {/* Content */}
                  <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                    <h3 className="text-lg font-semibold text-white">
                      {course.title}
                    </h3>

                    <p className="text-sm text-gray-200 mt-1">
                      {course.lessons?.length || 0} Lessons •{" "}
                      {course.category || "Uncategorized"}
                    </p>

                    <span className="mt-3 text-sm font-medium text-blue-300 group-hover:text-blue-200">
                      Edit Course →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
