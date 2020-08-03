const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

router.get('/', (req, res) => {
    res.json({response: "Working proper!"});
});

router.post('/createEmployee/v1', (req, res) => {
    let errorTracker = [];
    let errorCount = 0;
    if (!req.body){
        res.status(400).json({error: "Employee details missing."});
    }
    let { employeeName, employeeDesignation, employeeSalary, employeeDepartment, employeeCode } = req.body;
    if (!employeeName){
        errorTracker.push("employeeName is a required field.");
        errorCount++;
    }
    if (!employeeDesignation){
        errorTracker.push("employeeDesignation is a required field.");
        errorCount++;
    }
    if (!employeeDepartment){
        errorTracker.push("employeeDepartment is a required field.");
        errorCount++;
    }
    if (!employeeCode){
        errorTracker.push("employeeCode is a required field.");
        errorCount++;
    }
    if (errorCount > 0){
        res.status(400).json({error: errorTracker});
    }
    else{
        let newEmployee = {
            name: employeeName,
            designation: employeeDesignation.toUpperCase(),
            salary: employeeSalary ? employeeSalary: 0,
            department: employeeDepartment.toUpperCase(),
            code: employeeCode.toUpperCase()
        }
        Employee.create(newEmployee)
            .then(emp => { 
                console.log(emp)
                res.status(201).json(emp);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({error: "Something went wrong."});
            });
    }
});


module.exports = router;
