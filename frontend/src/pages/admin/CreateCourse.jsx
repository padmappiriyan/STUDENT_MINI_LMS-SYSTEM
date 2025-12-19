import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourseStore } from "../../store/courseStore";
import toast from "react-hot-toast";
import { FaImage, FaTimes } from "react-icons/fa";

import adminCourseImg from "../../assets/AdminDashboard/Add.png";

const AdminCreateCourse = () => {
  const navigate = useNavigate();
  const { createCourse, isLoading } = useCourseStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    duration: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );

      if (imageFile) data.append("image", imageFile);

      await createCourse(data);
      navigate("/admin/courses");
    } catch (error) {
      // Error handled by store
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      
      {/* ================= LEFT IMAGE SECTION ================= */}
      <div className="hidden lg:flex items-center justify-center bg-blue-50"
      style={{ backgroundImage: `url(${adminCourseImg})`, 
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",}}>
        
      </div>

      {/* ================= RIGHT FORM SECTION ================= */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Create New Course
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 space-y-6"
          >
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Course Image (Optional)
              </label>

              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-56 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-56 border-2 border-dashed border-gray-400  rounded-lg cursor-pointer hover:border-blue-500">
                  <FaImage className="text-5xl text-gray-400 mb-3" />
                  <p className="text-sm text-gray-500">
                    Click to upload or drag & drop
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Title */}
            <input
              type="text"
              name="title"
              placeholder="Course Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Description */}
            <textarea
              name="description"
              placeholder="Course Description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-400 "
              required
            />

            {/* Category */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg border-gray-400 "
            >
              <option>General</option>
              <option>Programming</option>
              <option>Design</option>
              <option>Business</option>
              <option>Marketing</option>
              <option>Other</option>
            </select>

            {/* Duration */}
            <input
              type="number"
              name="duration"
              placeholder="Duration (minutes)"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg border-gray-400 "
              required
            />

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin/courses")}
                className="flex-1 bg-gray-300 rounded-lg py-2"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white rounded-lg py-2"
              >
                {isLoading ? "Creating..." : "Create Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateCourse;


