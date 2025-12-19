import Notification from '../models/Notification.js';

/**
 * Sends a notification to a user via DB and Socket.IO
 * @param {Object} req - Express request object (to access io)
 * @param {Object} data - Notification data
 * @param {string} data.recipientId - ID of the user to receive the notification
 * @param {string} data.type - Type of notification (e.g., 'course_enrolled')
 * @param {string} data.title - Title of the notification
 * @param {string} data.message - Body of the notification
 * @param {string} [data.relatedId] - ID of related resource (course, lesson, etc.)
 */
export const sendNotification = async (req, { recipientId, type, title, message, relatedId }) => {
    try {
        // 1. Save to Database
        const notification = new Notification({
            recipient: recipientId,
            type,
            title,
            message,
            relatedId,
        });
        await notification.save();

        // 2. Emit via Socket.IO
        const io = req.app.get('io');
        if (io) {
            // Emit to the room with the recipient's ID
            io.to(recipientId.toString()).emit('receive_notification', notification);
            console.log(`Notification sent to user ${recipientId}`);
        } else {
            console.warn('Socket.IO instance not found on req.app');
        }

        return notification;
    } catch (error) {
        console.error('Error sending notification:', error);
        // Don't throw error to prevent blocking the main request
    }
};
