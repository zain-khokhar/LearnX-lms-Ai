const express = require('express');
const router = express.Router();
const progressController = require('@/app/api/controllers/progressController');

// User progress routes
router.get('/user/:userId', progressController.getUserProgress);
router.get('/courses/:userId', progressController.getCourseProgress);
router.get('/achievements/:userId', progressController.getUserAchievements);
router.put('/course/:userId/:courseId', progressController.updateCourseProgress);

module.exports = router;