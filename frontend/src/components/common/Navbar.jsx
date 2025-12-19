import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { FaSignOutAlt, FaTachometerAlt, FaChevronDown, FaUser, FaGraduationCap } from 'react-icons/fa';
import toast from 'react-hot-toast';
import NotificationDropdown from './NotificationDropdown';
import {useCourseActions} from "../../store/userCourseStore"

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const {clearUserCourses}=useCourseActions();

    const handleLogout = () => {
        logout();
        navigate("/");
        clearUserCourses();
        toast.success('Logged out successfully');
      
        setDropdownOpen(false);
    };

    const getDashboardLink = () => {
        return user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                                <FaGraduationCap className="text-white text-xl" />
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                    Quick Learn
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center space-x-3">
                        {isAuthenticated ? (
                            <>
                                {/* Notifications */}
                                <NotificationDropdown />

                                {/* User Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 border border-transparent hover:border-gray-200"
                                    >
                                        {/* Avatar */}
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md ring-2 ring-white">
                                                {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                        </div>

                                        {/* User Info */}
                                        <div className="hidden md:block text-left">
                                            <p className="font-semibold text-gray-900 text-sm leading-tight">
                                                {user?.firstName} {user?.lastName}
                                            </p>
                                            <p className="text-xs text-gray-500 capitalize">
                                                {user?.role}
                                            </p>
                                        </div>

                                        {/* Dropdown Icon */}
                                        <FaChevronDown
                                            className={`text-gray-400 text-xs transition-transform duration-300 ${
                                                dropdownOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slideDown">
                                            {/* User Info Header */}
                                            <div className="px-5 py-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-100">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                                                        {user?.firstName?.charAt(0).toUpperCase() || 'U'}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-900 text-sm">
                                                            {user?.firstName} {user?.lastName}
                                                        </p>
                                                        <p className="text-xs text-gray-600 capitalize flex items-center gap-1">
                                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                                            {user?.role}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-2">
                                                {/* Dashboard Link */}
                                                <Link
                                                    to={getDashboardLink()}
                                                    onClick={() => setDropdownOpen(false)}
                                                    className="flex items-center space-x-3 px-5 py-3 hover:bg-blue-50 transition-colors duration-200 group"
                                                >
                                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                                        <FaTachometerAlt className="text-blue-600 text-base" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-900 text-sm">Dashboard</p>
                                                        <p className="text-xs text-gray-500">View your dashboard</p>
                                                    </div>
                                                </Link>

                                                {/* Profile Link */}
                                                <Link
                                                    to={`/${user?.role}/profile`}
                                                    onClick={() => setDropdownOpen(false)}
                                                    className="flex items-center space-x-3 px-5 py-3 hover:bg-gray-50 transition-colors duration-200 group"
                                                >
                                                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                                        <FaUser className="text-gray-600 text-base" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-900 text-sm">Profile</p>
                                                        <p className="text-xs text-gray-500">Manage your account</p>
                                                    </div>
                                                </Link>
                                            </div>

                                            {/* Divider */}
                                            <div className="border-t border-gray-100 my-1"></div>

                                            {/* Logout Button */}
                                            <div className="py-2">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center space-x-3 px-5 py-3 hover:bg-red-50 transition-colors duration-200 group"
                                                >
                                                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors">
                                                        <FaSignOutAlt className="text-red-600 text-base" />
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <p className="font-medium text-gray-900 text-sm">Logout</p>
                                                        <p className="text-xs text-gray-500">Sign out of your account</p>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            /* Guest Links */
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-blue-600 font-medium px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/"
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 transform hover:scale-105"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </nav>
    );
};

export default Navbar;