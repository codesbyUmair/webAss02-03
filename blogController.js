const paginate = require('../utils/pagination');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

// Create a new blog post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId; // Extracted from the authentication middleware

    // Create a new blog post
    const newPost = new BlogPost({
      title,
      content,
      author: userId,
    });

    // Save the post to the database
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all blog posts with pagination and filtering
exports.getPosts = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
  
      // Fetch all blog posts from the database
      const allBlogPosts = await BlogPost.find().populate('author').sort({ createdAt: -1 });
  
      // Paginate the blog posts
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const paginatedPosts = allBlogPosts.slice(startIndex, endIndex);
  
      res.json({ posts: paginatedPosts, totalPosts: allBlogPosts.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

// Get a particular blog post by ID
exports.getPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Fetch the blog post from the database
    const blogPost = await BlogPost.findById(postId).populate('author');

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a blog post by ID
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body;

    // Fetch the blog post from the database
    const blogPost = await BlogPost.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Check if the authenticated user is the author of the blog post
    if (blogPost.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'You do not have permission to update this post' });
    }

    // Update the blog post
    blogPost.title = title;
    blogPost.content = content;
    await blogPost.save();

    res.json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a blog post by ID
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Fetch the blog post from the database
    const blogPost = await BlogPost.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Check if the authenticated user is the author of the blog post
    if (blogPost.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'You do not have permission to delete this post' });
    }

    // Delete the blog post
    await blogPost.remove();

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Rate a blog post
exports.ratePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const rating = req.body.rating;

    // Fetch the blog post from the database
    const blogPost = await BlogPost.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Check if the authenticated user has already rated the post
    const userRatingIndex = blogPost.ratings.findIndex(
      (r) => r.user.toString() === req.userId
    );

    if (userRatingIndex !== -1) {
      return res.status(400).json({ error: 'You have already rated this post' });
    }

    // Add the new rating
    blogPost.ratings.push({ user: req.userId, rating });

    // Calculate the new average rating
    const totalRatings = blogPost.ratings.length;
    const totalRatingSum = blogPost.ratings.reduce((sum, r) => sum + r.rating, 0);
    blogPost.averageRating = totalRatingSum / totalRatings;

    // Save the updated blog post
    await blogPost.save();

    res.json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Comment on a blog post
exports.commentPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { text } = req.body;

    // Fetch the blog post from the database
    const blogPost = await BlogPost.findById(postId);

    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Add the new comment
    blogPost.comments.push({ user: req.userId, text });

    // Save the updated blog post
    await blogPost.save();

    res.json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
