import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const NavbarSection = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="w-full max-w-7xl mx-auto">
      <div className="w-full mx-auto px-6 flex items-center justify-between h-16">

        {/* LEFT – Logo */}
        <div className="text-2xl font-bold text-blue-600 cursor-pointer">
          <NavLink to="/">QuickLearn</NavLink>
        </div>

        {/* CENTER – Menu Items */}
        <div className="hidden md:flex space-x-10 font-medium">

          {/* 🔹 CONDITIONAL LINK */}
          {isAuthenticated ? (
            <NavLink
              to="/student/dashboard"
              className="hover:text-blue-600"
            >
              Dashboard
            </NavLink>
          ) : (
            <NavLink
              to="/courses"
              className="hover:text-blue-600"
            >
              All Courses
            </NavLink>
          )}

          <NavLink to="/about" className="hover:text-blue-600">
            About
          </NavLink>

          <NavLink to="#" className="hover:text-blue-600">
            Business
          </NavLink>
        </div>

        {/* RIGHT – Auth Button */}
        <div>
          {isAuthenticated ? (
            <NavLink
              to="/student/dashboard"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Log In
            </NavLink>
          )}
        </div>

      </div>
    </nav>
  );
};

export default NavbarSection;
