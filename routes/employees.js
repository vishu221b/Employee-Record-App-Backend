const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/employee');

router.get('/employee/getAll', (req, res) => {
    Employee.find({})
        .then(allEmployees => {
            res.status(200).json({response: "SUCCESS", allEmployees: allEmployees});
        })
        .catch(error => {
            console.log(error.stack);
            res.status(404).json({error: "There was some error.", exceptionMessage: error.message});
        });    
});

router.get('/employee/getAllActive', (req, res)=> {
    Employee.find({is_active: true})
        .then(allEmployees => {
            res.status(200).json({response: "SUCCESS", allEmployees: allEmployees});
        })
        .catch(error => {
            console.log(error.stack);
            res.status(404).json({error: "There was some error.", exceptionMessage: error.message});
        });
});

router.get('/employee/getAllInActive', (req, res)=> {
    Employee.find({is_active: false})
        .then(allEmployees => {
            res.status(200).json({response: "SUCCESS", allEmployees: allEmployees});
        })
        .catch(error => {
            console.log(error.stack);
            res.status(404).json({error: "There was some error.", exceptionMessage: error.message});
        });
});

router.get('/employee/getById', (req, res) => {
    let userId = req.query.userId;
    if (!userId){
        res.status(400).json({error: "Missing user Id."});
    }
    else{
        Employee.findById(userId)
            .then(response => {
                console.log(response);
                res.status(200).json({response: "SUCCESS", employeeDetails: response});
            })
            .catch(error => {
                console.log(error.stack);
                res.status(404).json({error: "There was some error.", exceptionMessage: error.message});
            });
    }
});

router.get('/employee/getByCode', (req, res) => {
    let userEmployeeCode = req.query.employeeCode;
    if (!userEmployeeCode){
        res.status(400).json({error: "Missing employee code."});
    }
    else{
        Employee.findOne({code: userEmployeeCode.toUpperCase()})
            .then(response => {
                console.log(response);
                if(response == null){
                    response = `No employee found for code ${userEmployeeCode}.`;
                }
                res.status(200).json({response: "SUCCESS", employeeDetails: response});
            })
            .catch(error => {
                console.log(error.stack);
                res.status(404).json({error: "There was some error.", exceptionMessage: error.message});
            });
    }
});

router.post('/employee/createNew', (req, res) => {
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
            salary: employeeSalary ? employeeSalary: 10000,
            department: employeeDepartment.toUpperCase(),
            code: employeeCode.toUpperCase()
        }
        Employee.create(newEmployee)
            .then(emp => { 
                console.log(emp);
                res.status(201).json({ response: "SUCCESS", employeeDetails:emp});
            })
            .catch(error => {
                console.log(error.stack);
                res.status(404).json({error: "There was some error.", exceptionMessage: error.message});
            });
    }
});

router.put('/updateEmployee', (req, res) => {
    let { employeeId, employeeName, employeeDesignation, employeeSalary, employeeDepartment, employeeCode } = req.body;
    let userRequestDetails = {};
    if (!employeeId){
        res.status(400).json({error: "Missing employee id."});
    }else{
        if (employeeName){
            userRequestDetails.name = employeeName;
        }
        if (employeeDesignation){
            userRequestDetails.designation = employeeDesignation.toUpperCase();
        }
        if (employeeDepartment){
            userRequestDetails.department = employeeDepartment.toUpperCase();
        }
        if (employeeCode){
            userRequestDetails.code = employeeCode.toUpperCase();
        }
        if (employeeSalary){
            userRequestDetails.salary = employeeSalary < 10000?10000:employeeSalary;
        }
        Employee.findByIdAndUpdate(employeeId, userRequestDetails, {new: true})
        .then(response => {
            console.log("Update user response is: ", response);
            res.status(200).json({response:"SUCCESS", updatedEmployeeDetails: response});
        })
        .catch(error => {
            console.log(error.stack);
            res.status(404).json({error: "There was some error.", exceptionMessage: error.message});
        });
    }
});


module.exports = router;
