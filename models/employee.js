const mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
    name: String,
    designation: String,
    salary: Number,
    department: String,
    code: String
});

module.exports = mongoose.model('Employee', employeeSchema);
