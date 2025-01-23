// routes/courses.js
const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// POST endpoint to add new course
router.post('/add-course', async (req, res) => {
  try {
    const { title, instructor, image, video, category } = req.body;

    // Find the category
    let categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      categoryDoc = new Category({ name: category, courses: [] });
    }

    // Check if course already exists in category
    const existingCourse = categoryDoc.courses.find((course) => course.title === title);
    if (existingCourse) {
      return res.status(400).json({ message: 'This course already exists in the selected category.' });
    }

    // Add new course to category
    categoryDoc.courses.push({ title, instructor, image, video });

    await categoryDoc.save();
    res.status(200).json({ message: 'Course added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add course. Please try again later.' });
  }
});

module.exports = router;
