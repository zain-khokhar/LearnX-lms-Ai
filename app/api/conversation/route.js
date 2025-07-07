import { connectDB } from '@/lib/db';
import Conversation from '@/models/Conversation';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  await connectDB();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Get all conversations for user
  if (req.method === 'GET') {
    const conversations = await Conversation.find({
      participants: session.user.id
    })
    .populate('participants', 'name role avatar')
    .populate('lastMessage')
    .sort({ lastUpdated: -1 });

    return res.status(200).json(conversations);
  }

  // Create new conversation
  if (req.method === 'POST') {
    const { participantIds } = req.body;
    
    if (!participantIds.includes(session.user.id)) {
      participantIds.push(session.user.id);
    }

    const existingConvo = await Conversation.findOne({
      participants: { $all: participantIds, $size: participantIds.length }
    });

    if (existingConvo) return res.status(200).json(existingConvo);

    const newConversation = new Conversation({
      participants: participantIds
    });

    await newConversation.save();
    return res.status(201).json(newConversation);
  }

  return res.status(405).end();
}