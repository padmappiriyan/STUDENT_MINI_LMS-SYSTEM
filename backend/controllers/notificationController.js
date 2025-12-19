import  Notification  from '../models/Notification.js';

export  const createNotification = async (req, res) => {
  try {
    const { recipientId, type, title, message, relatedId } = req.body;

    const notification = new Notification({
      recipient: recipientId,
      type,
      title,
      message,
      relatedId,
    });

    await notification.save();
    res.status(201).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .sort('-createdAt')
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      recipient: req.user.id,
      read: false,
    });

    res.status(200).json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    await Notification.findByIdAndUpdate(notificationId, { read: true });

    res.status(200).json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, read: false },
      { read: true }
    );

    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
