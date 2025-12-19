import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaClock, FaBook, FaPlay, FaArrowLeft, FaTag } from "react-icons/fa";
import toast from "react-hot-toast";

import {useCourseStates,useCourseActions} from "../../store/userCourseStore";
import image1 from "../../assets/DashBoard/Lessons.png";

const StudentCourseDetails = () => {
  const { id } = useParams();
  //const { courses } = userCourseStates();
  
  const {userCourses} = useCourseStates();

  console.log(userCourses);
  const course = userCourses.find((lesson) => lesson._id === id);
   
  //console.log(courses);
  
  const formatDuration = (totalMinutes) => {
    if (totalMinutes < 60) {
      return `${totalMinutes} minutes`;
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (minutes === 0) {
      return `${hours} hours`;
    }

    return `${hours} hours ${minutes} minutes`;
  };

  return (
    <div className="h-full w-full">
      {/* Hero Section */}
      <div className="relative w-full min-h-[450px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(http://localhost:5000${course.image})`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 min-h-[450px] flex items-center">
          <div className="text-white max-w-2xl space-y-6">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/90 rounded-full text-sm font-medium backdrop-blur-sm">
              <FaTag className="text-xs" />
              {course.category}
            </div>
            
            {/* Title */}
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              {course.title}
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-200 leading-relaxed">
              {course.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FaClock className="text-xl text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Total Duration</p>
                  <p className="font-semibold text-lg">{formatDuration(course.duration)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FaBook className="text-xl text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Total Lessons</p>
                  <p className="font-semibold text-lg">
                    {course.lessons?.length || 0} Lessons
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Course Lessons
              </h2>
              <p className="text-gray-600">
                Complete all lessons to master this course
              </p>
            </div>

            <div className="space-y-4"data-aos="fade-up">
              {course.lessons && course.lessons.length > 0 ? (
                course.lessons.map((lesson, index) => (
                  <div
                    key={lesson._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Lesson Number */}
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-xl">
                              {index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Lesson Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {lesson.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                            {lesson.description || "No description available"}
                          </p>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <FaClock className="text-xs" />
                            <span>{formatDuration(lesson.duration || 0)}</span>
                          </div>
                        </div>

                        {/* Start Button */}
                        <div className="flex-shrink-0">
                          <Link
                            to={`/student/lesson/${lesson._id}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                          >
                            <FaPlay className="text-xs" />
                            Start
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaBook className="text-2xl text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg">
                    No lessons added for this course yet.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Side Image */}
          <div className="lg:col-span-1">
            <div className="">
              <div className=" overflow-hidden">
                <img 
                  src={image1} 
                  alt="Course Illustration"
                  className="w-full h-full object-cover"
                  data-aos="fade-left"
                  data-aos-duration="1200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseDetails;