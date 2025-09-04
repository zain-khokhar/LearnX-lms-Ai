import dbConnect from '@/lib/mongodb';
import UserProgress from '@/app/models/userProgress';
import CourseProgress from '@/app/models/CourseProgress';
import Achievement from '@/app/models/Achievements';

export async function POST(req) {
  await dbConnect();
  
  try {
    const { userId, courseId, progressData } = await req.json();
    
    // Update course progress
    await CourseProgress.findOneAndUpdate(
      { userId, courseId },
      progressData,
      { upsert: true, new: true }
    );
    
    // Recalculate overall progress
    const allCourses = await CourseProgress.find({ userId });
    const enrolledCourses = allCourses.length;
    const completedCourses = allCourses.filter(c => c.progress === 100).length;
    
    const updatedProgress = {
      enrolledCourses,
      completedCourses,
      inProgress: enrolledCourses - completedCourses,
      completionRate: Math.round((completedCourses / enrolledCourses) * 100) || 0,
      learningHours: allCourses.reduce((sum, course) => sum + course.hoursSpent, 0),
      avgScore: Math.round(allCourses.reduce((sum, course) => {
        const courseAvg = course.assessments.length 
          ? course.assessments.reduce((s, a) => s + a.score, 0) / course.assessments.length
          : 0;
        return sum + courseAvg;
      }, 0) / enrolledCourses) || 0
    };
    
    await UserProgress.findOneAndUpdate(
      { userId },
      updatedProgress,
      { upsert: true, new: true }
    );
    
    // Check for achievements (simplified example)
    if (completedCourses >= 5) {
      await Achievement.findOneAndUpdate(
        { userId, name: 'Course Master' },
        { 
          name: 'Course Master',
          description: 'Completed 5 courses',
          icon: '🏆',
          earned: true 
        },
        { upsert: true }
      );
    }
    
    return new Response(JSON.stringify({ success: true }), {
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