const express = require('express');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware.authenticateUser, blogController.createPost);
router.get('/posts', blogController.getPosts);
router.get('/post/:postId', blogController.getPost);
router.put('/update/:postId', authMiddleware.authenticateUser, blogController.updatePost);
router.delete('/delete/:postId', authMiddleware.authenticateUser, blogController.deletePost);
router.post('/rate/:postId', authMiddleware.authenticateUser, blogController.ratePost);
router.post('/comment/:postId', authMiddleware.authenticateUser, blogController.commentPost);

module.exports = router;
