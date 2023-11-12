const User = require('../models/User');
const BlogPost = require('../models/BlogPost');

// Get all users (admin operation)
exports.getAllUsers = async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You do not have permission to access this resource' });
    }

    // Fetch all users from the database
    const users = await User.find().select('-password');

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Block/Disable a user (admin operation)
exports.blockUser = async (req, res) => {
  try {
    const userIdToBlock = req.params.userId;

    // Check if the authenticated user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You do not have permission to perform this action' });
    }

    // Find the user to block
    const userToBlock = await User.findById(userIdToBlock);

    if (!userToBlock) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Disable the user (you may want to implement a more sophisticated blocking mechanism)
    userToBlock.isBlocked = true;

    // Save the updated user
    await userToBlock.save();

    res.json({ message: 'User blocked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all blog posts for admin
exports.getAllBlogPosts = async (req, res) => {
  try {
    // Check if the authenticated user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You do not have permission to access this resource' });
    }

    // Fetch all blog posts from the database
    const blogPosts = await BlogPost.find().populate('author');

    res.json(blogPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Disable a blog (admin operation)
exports.disableBlog = async (req, res) => {
  try {
    const postIdToDisable = req.params.postId;

    // Check if the authenticated user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You do not have permission to perform this action' });
    }

    // Find the blog post to disable
    const blogPostToDisable = await BlogPost.findById(postIdToDisable);

    if (!blogPostToDisable) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Disable the blog post
    blogPostToDisable.isDisabled = true;

    // Save the updated blog post
    await blogPostToDisable.save();

    res.json({ message: 'Blog post disabled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
