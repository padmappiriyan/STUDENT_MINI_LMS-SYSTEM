import React, { useEffect, useState, useRef } from 'react';
import { messageAPI } from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';


import {
    FaPaperPlane,
    FaUsers,
    FaSmile,
    FaPaperclip,
    FaCircle
} from 'react-icons/fa';


 //console.log(courses);
const StudentChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const { socket } = useSocket();
    const { user } = useAuthStore();
    const messagesEndRef = useRef(null);
    const roomId = 'general'; // Students use general room

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
 

    useEffect(() => {
        if (socket) {
            // Join the general room
            socket.emit('join_room', roomId);

            // Fetch existing messages
            fetchMessages();

            // Listen for new messages
            socket.on('receive_message', (data) => {
                setMessages((prev) => [...prev, {
                    sender: { _id: data.senderId, firstName: data.senderName || 'User' },
                    text: data.message,
                    createdAt: data.timestamp,
                    roomId: roomId
                }]);
            });

            return () => {
                socket.off('receive_message');
                socket.emit('leave_room', roomId);
            };
        }
    }, [socket, roomId]);

    const fetchMessages = async () => {
        try {
            const response = await messageAPI.getMessages(roomId);
            setMessages(response.data.messages || []);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            toast.error('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !socket) return;

        try {
            // Save to database
            await messageAPI.sendMessage({
                text: newMessage,
                roomId: roomId,
                recipientId: null, // Room chat, no specific recipient
            });

            // Emit via socket for real-time delivery
            socket.emit('send_message', {
                roomId: roomId,
                message: newMessage,
                senderId: user?.id || user?._id,
                senderName: `${user?.firstName} ${user?.lastName}`,
            });

            setNewMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
            toast.error('Failed to send message');
        }
    };

    const isMyMessage = (msg) => {
        const msgSenderId = msg.sender?._id || msg.sender;
        const currentUserId = user?.id || user?._id;
        return msgSenderId === currentUserId;
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                            Student Chat
                        </h1>
                        <p className="text-gray-600 flex items-center gap-2">
                            <FaUsers className="text-blue-500" />
                            Connect with instructors and fellow students
                        </p>
                    </div>

                    {/* Chat Container */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-[calc(100vh-12rem)] flex flex-col">
                        {/* Chat Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-white">General Discussion</h2>
                                    <p className="text-blue-100 text-sm">Ask questions and share knowledge</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCircle className="w-3 h-3 text-green-400 animate-pulse" />
                                    <span className="text-white text-sm font-medium">Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
                            {loading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {messages.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                                                <FaUsers className="text-5xl text-blue-400" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No messages yet</h3>
                                            <p className="text-gray-500">Be the first to start the conversation!</p>
                                        </div>
                                    ) : (
                                        messages.map((msg, index) => {
                                            const isMine = isMyMessage(msg);
                                            const showAvatar = index === 0 || !isMyMessage(messages[index - 1]) !== !isMine;
                                            const senderName = msg.sender?.firstName || 'User';

                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex ${isMine ? 'justify-end' : 'justify-start'} items-end gap-2 animate-fadeIn`}
                                                >
                                                    {/* Other User Avatar */}
                                                    {!isMine && showAvatar && (
                                                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                                                            {senderName.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    {!isMine && !showAvatar && <div className="w-10"></div>}

                                                    {/* Message Bubble */}
                                                    <div className={`max-w-md md:max-w-lg ${isMine ? 'items-end' : 'items-start'}`}>
                                                        {!isMine && showAvatar && (
                                                            <p className="text-xs text-gray-500 mb-1 ml-2">{senderName}</p>
                                                        )}
                                                        <div
                                                            className={`rounded-2xl px-5 py-3 shadow-md transition-all duration-200 hover:shadow-lg ${isMine
                                                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none'
                                                                    : 'bg-white border-2 border-gray-100 text-gray-800 rounded-bl-none'
                                                                }`}
                                                        >
                                                            <p className="text-sm md:text-base leading-relaxed break-words">
                                                                {msg.text}
                                                            </p>
                                                        </div>
                                                        <p className={`text-xs text-gray-400 mt-1.5 ${isMine ? 'text-right mr-2' : 'ml-2'}`}>
                                                            {new Date(msg.createdAt).toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}
                                                        </p>
                                                    </div>

                                                    {/* My Avatar */}
                                                    {isMine && showAvatar && (
                                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                                                            {user?.firstName?.charAt(0).toUpperCase() || 'M'}
                                                        </div>
                                                    )}
                                                    {isMine && !showAvatar && <div className="w-10"></div>}
                                                </div>
                                            );
                                        })
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="border-t border-gray-200 bg-white p-4 md:p-6">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                                {/* Attachment Button */}
                                <button
                                    type="button"
                                    className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-200"
                                    title="Attach file"
                                >
                                    <FaPaperclip className="text-xl" />
                                </button>

                                {/* Emoji Button */}
                                <button
                                    type="button"
                                    className="p-3 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-xl transition-all duration-200"
                                    title="Add emoji"
                                >
                                    <FaSmile className="text-xl" />
                                </button>

                                {/* Message Input */}
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full px-5 py-3 md:py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-400"
                                    />
                                </div>

                                {/* Send Button */}
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="p-3 md:p-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                                    title="Send message"
                                >
                                    <FaPaperPlane className="text-xl" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
            </div>
        </>
    );
};

export default StudentChat;
