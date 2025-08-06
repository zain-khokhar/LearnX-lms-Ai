import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  enrolledCourses: Number,
  completedCourses: Number,
  inProgress: Number,
  completionRate: Number,
  learningHours: Number,
  streak: Number,
  avgScore: Number,
  weeklyProgress: [Number],
  weeklyHours: [Number]
}, { timestamps: true });

export default mongoose.models.UserProgress || 
       mongoose.model('UserProgress', userProgressSchema);