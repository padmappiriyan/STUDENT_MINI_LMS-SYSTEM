import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoBookOutline,
  IoTrendingUpOutline,
  IoTrophyOutline,
  IoTimeOutline,
  IoChevronForwardOutline,
 
} from "react-icons/io5";
import image1 from "../../assets/DashBoard/Success.png";

//import { userCourseActions, userCourseStates } from "../../store/courseStore";
import Promotion from "../../components/Promotion/promotion";
import Stats from "../../components/student/Stats";
import image2 from "../../assets/DashBoard/Talent.png"
import {useCourseActions,useCourseStates} from "../../store/userCourseStore";

const StudentDashboard = () => {
  const navigate = useNavigate();
  //const { fetchCourses, startCourse } = userCourseActions();
   const {userCourses} = useCourseStates();
  const { fetchUserCourses,startCourse } = useCourseActions();
 
  useEffect(() => {
    fetchUserCourses();
  }, []);
  
  
  console.log(userCourses);

  const handleStartLearning = (id) => {
    console.log(id);
    startCourse(id);
  };
  const handleContinueLearning = (id) =>{
      navigate(`/student/course/${id}`);
     
  }
  

  const handleContact = ()=>{
         navigate("/contact_us");
  }
  const stats = [
    {
      icon: IoBookOutline,
      label: "Enrolled Courses",
      value: userCourses.length,
      color: "bg-blue-500",
    },
    {
      icon: IoTimeOutline,
      label: "Learning Hours",
      value: "24+",
      color: "bg-purple-500",
    },
    {
      icon: IoTrophyOutline,
      label: "Certificates",
      value: "3",
      color: "bg-green-500",
    },
    {
      icon: IoTrendingUpOutline,
      label: "Completed Courses",
      value: "3",
      color: "bg-orange-500",
    },
  ];

  return (
    
    <div className="h-full w-full ">
      {/* Hero Section */}
      <div className="relative overflow-hidden ">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(255,255,255,.1) 0%, transparent 50%)`,
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-linear-to-r from-blue-600 to-pink-500 text-white backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  Welcome back! 👋
                </span>
              </div>

              <h1 className="text-4xl text-blue-900 sm:text-5xl lg:text-6xl font-bold leading-tight">
                Build Your Skills with
                <span
                  className="block bg-linear-to-r  from-blue-500 to-pink-600
               bg-clip-text text-transparent"
                >
                  Quick Learn
                </span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                Learn from industry experts through practical online courses.
                Master software development, AI, and digital skills anytime,
                anywhere.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => navigate("/student/courses")}
                  className="group px-8 py-4 bg-blue-800 text-white rounded-xl font-semibold hover:bg-blue-900 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Browse Courses
                  <IoChevronForwardOutline className="text-xl group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate("/student/progress")}
                  className="px-8 py-4 border border-blue-900 backdrop-blur-sm text-blue-900 rounded-xl font-semibold  transition-all duration-300  flex items-center gap-2"
                >
                  <IoTrendingUpOutline className="text-xl" />
                  View Progress
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-tr from-yellow-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
              <img
                src={image1}
                alt="Student Success"
                className="relative w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                data-aos="fade-up"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-4 rounded-xl`}>
                    <IconComponent className="text-2xl text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-3">
              <IoBookOutline className="text-4xl text-blue-600" />
              Your Learning Journey
            </h2>
            <p className="text-gray-600 mt-2">Start the Learning</p>
          </div>

          <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1 group">
            View All
            <IoChevronForwardOutline className="text-xl group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {userCourses.filter(
          (course) => course.enrollments[0]?.status === "enrolled"
        ).length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
            <IoBookOutline className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No courses enrolled yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start your learning journey today!
            </p>
            <button
              onClick={() => navigate("/student/courses")}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {userCourses
              .filter((course) => course.enrollments[0]?.status === "enrolled")
              .map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex overflow-hidden"
                  data-aos="fade-up"
                >
                  {/* Image */}
                  <img
                    src={`http://localhost:5000${course.image}`}
                    alt={course.title}
                    className="w-64 h-48 object-cover"
                  />

                  {/* Content */}
                  <div className="p-6 flex items-center justify-between flex-1">
                    <div className="flex flex-col justify-between gap-3">
                      <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full w-fit">
                        {course.category}
                      </span>

                      <h3 className="text-xl font-semibold text-blue-800">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 text-sm">
                        {course.description}
                      </p>

                      <div className="text-sm text-gray-500">
                        ⏱ {course.duration} minutes
                      </div>
                    </div>

                    <div>
                      <button
                        className="mt-3 w-fit bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                        onClick={() => handleStartLearning(course._id)}
                      >
                        Start Learning
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Started Courses Section*/}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-3">
              <IoBookOutline className="text-4xl text-blue-600" />
              Your Learning Journey
            </h2>
            <p className="text-gray-600 mt-2">Continue the Learning</p>
          </div>

          <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1 group">
            View All
            <IoChevronForwardOutline className="text-xl group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {userCourses.filter(
          (course) => course.enrollments[0]?.status === "started"
        ).length === 0 ? (
          <div>
            
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {userCourses
              .filter((course) => course.enrollments[0]?.status === "started")
              .map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex overflow-hidden"
                  data-aos="fade-up"
                >
                  {/* Image */}
                  <img
                    src={`http://localhost:5000${course.image}`}
                    alt={course.title}
                    className="w-64 h-48 object-cover"
                  />

                  {/* Content */}
                  <div className="p-6 flex items-center justify-between flex-1">
                    <div className="flex flex-col justify-between gap-3">
                      <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full w-fit">
                        {course.category}
                      </span>

                      <h3 className="text-xl font-semibold text-blue-800">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 text-sm">
                        {course.description}
                      </p>

                      <div className="text-sm text-gray-500">
                        ⏱ {course.duration} minutes
                      </div>
                    </div>

                    <div>
                      <button
                        className="mt-3 w-fit bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                        onClick={() => handleContinueLearning(course._id)}
                      >
                        Continue Learning
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>


        {/* Promotion Courses Section*/}
       <div className="max-w-7xl mx-auto px-6 py-16">
           
           <Promotion/>
       </div>
        
        
        {/* Stats Section*/}
       <div className="max-w-7xl mx-auto px-6 py-16">
           
           <Stats/>
       </div>
       
       <div className="w-full bg-linear-to-br from-blue-50 via-white to-blue-100 py-16 px-6 rounded-2xl mb-16">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900">
            Want to Learn from the Best?
          </h2>
          <p className="text-gray-700 text-lg">
            Join our platform and get access to valuable classes from talented instructors. 
            Boost your skills, stay ahead, and shape your career with our expert guidance.
          </p>
          <p className="text-gray-700 text-lg">
            We have more experienced and passionate lecturers ready to teach you. 
            Your learning journey starts here!
          </p>
          <div>
          <button
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md"
          onClick={handleContact}
          >
            Contact Us Now
          </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <img
            src={image2}
            alt="Talented instructors"
            data-aos="fade-left"
            data-aos-duration="1200"
            className="w-full max-w-md rounded-2xl  object-contain"
          />
        </div>
        </div>
       </div>
    </div>
  );
};

export default StudentDashboard;
