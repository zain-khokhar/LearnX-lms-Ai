import mongoose from 'mongoose';
console.log('Loading CourseProgress model...');
const courseProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course'
  },
  title: String,
  instructor: String,
  progress: Number,
  hoursSpent: Number,
  hoursLeft: Number,
  lastAccessed: Date,
  targetDate: Date,
  assessments: [{
    name: String,
    score: Number
  }]
}, { timestamps: true });

export default mongoose.models.CourseProgress || 
       mongoose.model('CourseProgress', courseProgressSchema);