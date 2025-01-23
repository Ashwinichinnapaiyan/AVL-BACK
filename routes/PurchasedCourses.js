// backend/routes/purchasedCourses.js
const express = require('express');
const PurchasedCourse = require('../models/PurchasedCourse');
const router = express.Router();

// Route to save purchased course data
router.post('/purchase', async (req, res) => {
  try {
    const { title, instructor, image, price, expiryDate, userId } = req.body;

    const newCourse = new PurchasedCourse({
      title,
      instructor,
      image,
      price,
      expiryDate,
      userId,
    });

    await newCourse.save();
    res.status(200).json({ message: 'Course purchased successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving course purchase', error });
  }
});

// Route to get purchased courses for a specific user
router.get('/purchased/:userId', async (req, res) => {
  try {
    const courses = await PurchasedCourse.find({ userId: req.params.userId });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching purchased courses', error });
  }
});

module.exports = router;
