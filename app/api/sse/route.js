import { connectDB } from '@/lib/db';
import { getSession } from 'next-auth/react';

// Keep track of connected clients
const clients = new Map();

export default async function handler(req, res) {
  await connectDB();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const userId = session.user.id;
  const clientId = Date.now();
  
  const newClient = {
    id: clientId,
    res
  };

  clients.set(userId, newClient);

  // Send initial ping
  res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);

  // Remove client when connection closes
  req.on('close', () => {
    clients.delete(userId);
  });
}

// Helper function to send events to user
export function sendSSE(userId, data) {
  const client = clients.get(userId);
  if (client) {
    client.res.write(`data: ${JSON.stringify(data)}\n\n`);
  }
}