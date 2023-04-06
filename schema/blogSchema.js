const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  hostedLink: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Create a model for the project collection
const Blog = mongoose.model('Blog', blogSchema);


module.exports = Blog;
