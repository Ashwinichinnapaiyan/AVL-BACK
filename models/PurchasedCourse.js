// backend/models/PurchasedCourse.js
const mongoose = require('mongoose');

const PurchasedCourseSchema = new mongoose.Schema({
  title: String,
  instructor: String,
  image: String,
  price: String,
  expiryDate: String,
  userId: { type: String, required: true }, // To associate with user
});

module.exports = mongoose.model('PurchasedCourse', PurchasedCourseSchema);
