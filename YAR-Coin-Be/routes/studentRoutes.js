const Student = require('../models/Student');
const express = require('express');
const Router = express.Router();

Router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(200).json(student);
    }
    catch (err){
        res.status(400).json({error : err.message});
    }
});

Router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    }
    catch (err) {
        res.status(400).json({error : err.message});
    }
});

module.exports = Router;