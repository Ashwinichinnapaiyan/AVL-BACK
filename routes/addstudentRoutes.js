const express = require('express');
const { getAllStudents, addStudent, updateStudent, deleteStudent } = require('../controllers/addstudentController');

const router = express.Router();

// Get all students
router.get('/', getAllStudents);

// Add a student
router.post('/', addStudent);

// Update a student by ID
router.put('/:id', updateStudent);

// Delete a student by ID
router.delete('/:id', deleteStudent);

module.exports = router;
