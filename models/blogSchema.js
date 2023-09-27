import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  metaTitle: {
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  },],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;