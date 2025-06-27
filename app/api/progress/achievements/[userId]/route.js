import dbConnect from '@/app/lib/mongodb';
import Achievement from '@/app/api/models/Achievements';

export async function GET(req, { params }) {
  await dbConnect();
  
  try {
    const achievements = await Achievement.find({ userId: params.userId });
    return new Response(JSON.stringify(achievements), {
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