const UserProgress = require('@/app/api/models/userProgress');
const CourseProgress = require('@/app/api/models/CourseProgress');
const UserAchievement = require('@/app/api/models/Achievements');
const Achievement = require('@/app/api/progress/achievements');

// Get user progress summary
exports.getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    const userProgress = await UserProgress.findOne({ userId })
      .populate('userId', 'name email')
      .lean();

    if (!userProgress) {
      return res.status(404).json({ message: 'Progress data not found' });
    }

    res.json({
      overall: {
        enrolledCourses: userProgress.enrolledCourses,
        completedCourses: userProgress.completedCourses,
        inProgress: userProgress.inProgress,
        completionRate: userProgress.completionRate,
        learningHours: userProgress.learningHours,
        streak: userProgress.streak,
        avgScore: userProgress.avgScore
      },
      weeklyProgress: userProgress.weeklyProgress,
      weeklyHours: userProgress.weeklyHours
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get course progress details
exports.getCourseProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const courseProgress = await CourseProgress.find({ userId })
      .populate('courseId', 'title instructor')
      .lean();

    res.json(courseProgress.map(cp => ({
      id: cp._id,
      title: cp.courseId.title,
      instructor: cp.courseId.instructor,
      progress: cp.progress,
      hoursSpent: cp.hoursSpent,
      hoursLeft: cp.hoursLeft,
      lastAccessed: cp.lastAccessed,
      targetDate: cp.targetDate,
      assessments: cp.assessments
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user achievements
exports.getUserAchievements = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const userAchievements = await UserAchievement.find({ userId })
      .populate('achievementId')
      .lean();

    res.json(userAchievements.map(ua => ({
      id: ua.achievementId._id,
      name: ua.achievementId.name,
      description: ua.achievementId.description,
      earned: ua.earned,
      icon: ua.achievementId.icon
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update course progress
exports.updateCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const updateData = req.body;

    const progress = await CourseProgress.findOneAndUpdate(
      { userId, courseId },
      updateData,
      { new: true, upsert: true }
    );

    // Recalculate overall progress
    await this.calculateOverallProgress(userId);

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Calculate overall progress (internal method)
exports.calculateOverallProgress = async (userId) => {
  const courseProgress = await CourseProgress.find({ userId });
  
  const enrolledCourses = courseProgress.length;
  const completedCourses = courseProgress.filter(cp => cp.progress === 100).length;
  const inProgress = enrolledCourses - completedCourses;
  const completionRate = enrolledCourses > 0 
    ? Math.round((completedCourses / enrolledCourses) * 100) 
    : 0;
  
  const learningHours = courseProgress.reduce((sum, cp) => sum + cp.hoursSpent, 0);
  const avgScore = courseProgress.length > 0
    ? Math.round(courseProgress.reduce((sum, cp) => {
        const courseAvg = cp.assessments.length > 0
          ? cp.assessments.reduce((s, a) => s + a.score, 0) / cp.assessments.length
          : 0;
        return sum + courseAvg;
      }, 0) / courseProgress.length)
    : 0;

  await UserProgress.findOneAndUpdate(
    { userId },
    {
      enrolledCourses,
      completedCourses,
      inProgress,
      completionRate,
      learningHours,
      avgScore
    },
    { new: true, upsert: true }
  );

  // Check achievements
  await this.checkAchievements(userId);
};

// Check and award achievements (internal method)
exports.checkAchievements = async (userId) => {
  const achievements = await Achievement.find();
  const userProgress = await UserProgress.findOne({ userId });
  const courseProgress = await CourseProgress.find({ userId });

  for (const achievement of achievements) {
    let earned = false;
    
    switch(achievement.criteria.type) {
      case 'coursesCompleted':
        earned = userProgress.completedCourses >= achievement.criteria.value;
        break;
      case 'streakDays':
        earned = userProgress.streak >= achievement.criteria.value;
        break;
      case 'highScores':
        const highScoreCourses = courseProgress.filter(cp => 
          cp.assessments.length > 0 && 
          cp.assessments.reduce((s, a) => s + a.score, 0) / cp.assessments.length >= 90
        );
        earned = highScoreCourses.length >= achievement.criteria.value;
        break;
    }

    if (earned) {
      await UserAchievement.findOneAndUpdate(
        { userId, achievementId: achievement._id },
        { earned: true, earnedAt: new Date() },
        { upsert: true }
      );
    }
  }
};
// hello zain 
if(true){
  console.log("hello zain");
}