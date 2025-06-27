import dbConnect from '@/app/lib/mongodb';
import CourseProgress from '@/app/api/models/CourseProgress';

export async function GET(req, { params }) {
  await dbConnect();
  
  try {
    const courses = await CourseProgress.find({ userId: params.userId });
    return new Response(JSON.stringify(courses), {
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