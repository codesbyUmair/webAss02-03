const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();
router.post('/block-user/:userId', authMiddleware.authenticateUser, adminMiddleware.checkAdmin, adminController.blockUser);
router.get('/users', authMiddleware.authenticateUser, adminMiddleware.checkAdmin, adminController.getAllUsers);
router.put('/block/:userId', authMiddleware.authenticateUser, adminMiddleware.checkAdmin, adminController.blockUser);
router.get('/blog-posts', authMiddleware.authenticateUser, adminMiddleware.checkAdmin, adminController.getAllBlogPosts);
router.put('/disable-blog/:postId', authMiddleware.authenticateUser, adminMiddleware.checkAdmin, adminController.disableBlog);

module.exports = router;
