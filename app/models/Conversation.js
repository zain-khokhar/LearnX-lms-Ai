// models/Conversation.js
import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Conversation || 
       mongoose.model('Conversation', conversationSchema);