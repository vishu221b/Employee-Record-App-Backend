const mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
    name: String,
    designation: String,
    salary: Number,
    department: String,
    code: String,
    is_active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Employee', employeeSchema);
