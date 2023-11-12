const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config()

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_STRING).then(()=>{
  console.log("Connected")
}).catch(err=>{
  console.log(err)
})

// Routes
const authRoutes = require('./Routes/authRoutes');
const blogRoutes = require('./Routes/blogRoutes');
const userRoutes = require('./Routes/userRoutes');
const adminRoutes = require('./Routes/adminRoutes');

app.use('/auth', authRoutes);
app.use('/blog', blogRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

module.exports = app;
