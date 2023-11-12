const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
    },
  ],
  rating: { type: Number, default: 0 },
  // Add other blog post-related fields as needed
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
