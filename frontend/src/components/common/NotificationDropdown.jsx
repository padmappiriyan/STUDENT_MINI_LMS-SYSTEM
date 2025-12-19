import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaCheckDouble, FaCircle } from 'react-icons/fa';
import { notificationAPI } from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
    const { socket } = useSocket();
    const navigate = useNavigate();

    // Fetch notifications on mount
    useEffect(() => {
        fetchNotifications();
    }, []);

    // Socket listener for new notifications
    useEffect(() => {
        if (socket) {
            socket.on('receive_notification', (newNotification) => {
                setNotifications((prev) => [newNotification, ...prev]);
                setUnreadCount((prev) => prev + 1);
                toast.success(newNotification.title);
            });

            return () => {
                socket.off('receive_notification');
            };
        }
    }, [socket]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await notificationAPI.getNotifications();
            setNotifications(response.data.notifications);
            setUnreadCount(response.data.unreadCount);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await notificationAPI.markAsRead(id);
            setNotifications((prev) =>
                prev.map((n) => (n._id === id ? { ...n, read: true } : n))
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            setLoading(true);
            await notificationAPI.markAllAsRead();
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNotificationClick = (notification) => {
        if (!notification.read) {
            handleMarkAsRead(notification._id);
        }
        setIsOpen(false);

        // Navigate based on notification type
        switch (notification.type) {
            case 'message_received':
                navigate(notification.relatedId ? `/student/chat` : '/student/chat');
                break;
            case 'course_enrolled':
                navigate(`/student/course/${notification.relatedId}`);
                break;
            case 'lesson_published':
                navigate(`/student/course/${notification.relatedId}`);
                break;
            case 'quiz_result':
                navigate(`/student/quiz/${notification.relatedId}`); // Or results page
                break;
            case 'certificate_earned':
                navigate('/student/dashboard');
                break;
            default:
                break;
        }
    };

    const getIconColor = (type) => {
        switch (type) {
            case 'message_received': return 'bg-blue-100 text-blue-600';
            case 'course_enrolled': return 'bg-green-100 text-green-600';
            case 'quiz_result': return 'bg-purple-100 text-purple-600';
            case 'certificate_earned': return 'bg-yellow-100 text-yellow-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
            >
                <FaBell className="text-xl text-gray-600" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-fadeIn overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-bold text-gray-800">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                disabled={loading}
                                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors"
                            >
                                <FaCheckDouble /> Mark all read
                            </button>
                        )}
                    </div>

                    <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <FaBell className="mx-auto text-3xl mb-3 text-gray-300" />
                                <p>No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    onClick={() => handleNotificationClick(notification)}
                                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3 ${!notification.read ? 'bg-blue-50/50' : ''
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                                        <FaBell />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                                {notification.title}
                                            </h4>
                                            {!notification.read && (
                                                <FaCircle className="text-blue-500 text-[8px] mt-1.5" />
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                                            {notification.message}
                                        </p>
                                        <p className="text-[10px] text-gray-400">
                                            {new Date(notification.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-2 bg-gray-50 border-t border-gray-100 text-center">
                        <button className="text-xs text-gray-500 hover:text-blue-600 font-medium transition-colors">
                            View All Notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
