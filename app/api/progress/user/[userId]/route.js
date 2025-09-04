import dbConnect from '@/app/lib/mongodb';
import UserProgress from '@/app/models/userProgress';

export async function GET(req, { params }) {
  await dbConnect();
  
  try {
    const progress = await UserProgress.findOne({ userId: params.userId });
    
    if (!progress) {
      return new Response(JSON.stringify({ error: 'Progress not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({
      overall: {
        enrolledCourses: progress.enrolledCourses,
        completedCourses: progress.completedCourses,
        inProgress: progress.inProgress,
        completionRate: progress.completionRate,
        learningHours: progress.learningHours,
        streak: progress.streak,
        avgScore: progress.avgScore
      },
      weeklyProgress: progress.weeklyProgress,
      weeklyHours: progress.weeklyHours
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}