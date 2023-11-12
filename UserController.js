const User = require('../models/User');
const BlogPost = require('../models/BlogPost');

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const userIdToFollow = req.params.userId;

    // Check if the user to follow exists
    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is already following the target user
    const isAlreadyFollowing = req.user.following.includes(userIdToFollow);
    if (isAlreadyFollowing) {
      return res.status(400).json({ error: 'You are already following this user' });
    }

    // Add the target user to the follower's following list
    req.user.following.push(userIdToFollow);
    await req.user.save();

    res.json({ message: 'User followed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get the user's feed
exports.getUserFeed = async (req, res) => {
  try {
    const user = req.user;

    // Get the list of users the current user is following
    const following = user.following;

    // Get blog posts from users the current user is following
    const feed = await BlogPost.find({ author: { $in: following } }).populate('author');

    res.json(feed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get notifications for the current user
exports.getNotifications = async (req, res) => {
  try {
    const user = req.user;

    // Get notifications for the current user (for simplicity, assuming notifications are stored in a 'notifications' field)
    const notifications = user.notifications || [];

    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
