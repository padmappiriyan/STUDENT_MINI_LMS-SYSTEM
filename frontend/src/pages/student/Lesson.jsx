import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import { useCourseStates } from "../../store/userCourseStore";
import { progressAPI } from "../../services/api";

const StudentLesson = () => {
  const { id } = useParams();
  const { userCourses } = useCourseStates();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userCourses?.length > 0) {
      const foundLesson = userCourses
        .flatMap(course => course.lessons)
        .find(lesson => lesson._id === id);

      setLesson(foundLesson);
      setLoading(false);
    }
  }, [userCourses, id]);

  const getVideoUrl = (url) => {
    if (!url) return null;
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return url;
  };

  const handleMarkComplete = async () => {
    try {
      await progressAPI.updateProgress({
        courseId: lesson.course,
        lessonId: id,
        timeSpent: 5,
      });
      toast.success("Lesson marked as complete!");
    } catch {
      toast.error("Failed to update progress");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading lesson...
      </div>
    );

  if (!lesson)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Lesson not found
      </div>
    );

  const lessonProgress = lesson.progress ?? 0;
  const canMarkComplete = lessonProgress >= 80;

  return (
    <div className="h-full w-full p-14">
      <div className="max-w-7xl mx-auto mb-24">

        {/* 🔹 Title */}
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          {lesson.title}
        </h1>

        {/* 🔹 Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* 🎥 LEFT: Video */}
          <div className="md:col-span-2 bg-black rounded-xl overflow-hidden shadow-lg aspect-video">
            {lesson.videoUrl && (
              <ReactPlayer
                url={getVideoUrl(lesson.videoUrl)}
                width="100%"
                height="100%"
                controls
              />
            )}
          </div>

          {/* 📘 RIGHT: Lesson Info */}
          <div className="space-y-6">

            {/* Progress Card */}
            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="font-semibold text-lg mb-2">Lesson Progress</h2>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${lessonProgress}%` }}
                />
              </div>

              <p className="text-sm text-gray-600 mt-2">
                {lessonProgress}% completed
              </p>

              {lessonProgress < 80 && (
                <p className="text-xs text-red-500 mt-1">
                  Watch at least 80% to complete this lesson
                </p>
              )}
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-xl shadow p-5">
              <h2 className="font-semibold text-lg mb-2">Lesson Content</h2>
              <p className="text-gray-700 leading-relaxed">
                {lesson.content || "No content available for this lesson."}
              </p>
            </div>

            {/* Resources */}
            {lesson.resources?.length > 0 && (
              <div className="bg-white rounded-xl shadow p-5">
                <h2 className="font-semibold text-lg mb-2">Resources</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {lesson.resources.map((res, index) => (
                    <li key={index}>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {res.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-3">
              <button
                onClick={() => window.history.back()}
                className="py-3 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold"
              >
                ← Back to Course
              </button>

              <button
                onClick={handleMarkComplete}
                disabled={!canMarkComplete}
                className={`py-3 rounded-lg font-semibold transition
                  ${
                    canMarkComplete
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                ✔ Mark as Complete
              </button>

              {lesson.quiz && (
                <button
                  onClick={() =>
                    window.location.href = `/student/quiz/${lesson.quiz._id || lesson.quiz}`
                  }
                  className="py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold"
                >
                  📝 Take Quiz
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLesson;
