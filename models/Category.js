// models/Category.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  instructor: String,
  image: String,
  video: String,
  description:String,
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  courses: [courseSchema], // Array of courses in this category
});

module.exports = mongoose.model('Category', categorySchema);
