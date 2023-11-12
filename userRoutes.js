const express = require('express');
const userController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/follow/:userId', authMiddleware.authenticateUser, userController.followUser);
router.get('/feed', authMiddleware.authenticateUser, userController.getUserFeed);
router.get('/notifications', authMiddleware.authenticateUser, userController.getNotifications);

module.exports = router;
