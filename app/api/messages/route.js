import { connectDB } from '@/lib/db';
import Message from '@/models/Message';
import Conversation from '@/models/Conversation';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  await connectDB();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { conversationId } = req.query;

  // Get messages for conversation
  if (req.method === 'GET') {
    const messages = await Message.find({ conversation: conversationId })
      .populate('sender', 'name avatar role')
      .sort({ timestamp: 1 });

    // Mark messages as seen
    await Message.updateMany(
      { 
        conversation: conversationId,
        sender: { $ne: session.user.id },
        seen: false
      },
      { $set: { seen: true } }
    );

    return res.status(200).json(messages);
  }

  // Send new message
  if (req.method === 'POST') {
    const { text, attachments = [] } = req.body;
    
    const conversation = await Conversation.findById(conversationId);
    if (!conversation.participants.includes(session.user.id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const newMessage = new Message({
      conversation: conversationId,
      sender: session.user.id,
      text,
      attachments
    });

    await newMessage.save();

    // Update conversation last message
    conversation.lastMessage = newMessage._id;
    conversation.lastUpdated = Date.now();
    await conversation.save();

    return res.status(201).json(newMessage);
  }

  return res.status(405).end();
}