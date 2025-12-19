import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  try {
    const { recipientId, text, roomId } = req.body;

    const message = new Message({
      sender: req.user.id,
      recipient: recipientId,
      text,
      roomId,
      status: 'sent',
    });

    await message.save();
    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await Message.find({ roomId })
      .populate('sender', 'firstName lastName')
      .populate('recipient', 'firstName lastName')
      .sort('createdAt');

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    await Message.findByIdAndUpdate(messageId, { status: 'seen' });

    res.status(200).json({ success: true, message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
