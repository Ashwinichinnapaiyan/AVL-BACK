const mongoose = require('mongoose');

const DetailedStudentSchema = new mongoose.Schema({
    student_name: { type: String, required: true },
    student_age: { type: Number, required: true },
    student_address: { type: String, required: true },
    student_mobileNo: { type: String, required: true, match: /^\d{10}$/ },
    student_course: { type: String, required: true },
    student_courseAmount: { type: Number, required: true },
    student_expiryDate: { type: Date, required: true }
});

const DetailedStudent = mongoose.model('DetailedStudent', DetailedStudentSchema);

module.exports = DetailedStudent;
