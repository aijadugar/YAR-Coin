const express = require('express');
const Router = express.Router();
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Bidding = require('../models/Bidding');

// ankit raunak neha 
// http://localhost:5000/api/biddings
// {
//     "studentId": "68f9e6194eec53facaa1357f",
//     "teacherId": "68f88c17cf467a42cb3a29a4",
//     "bidAmount": 10000
// }
// neha  68f88c4acf467a42cb3a29a6
// sweety 68f88c98cf467a42cb3a29a8  

Router.post('/', async (req, res) => {
    try {
        const { studentId, teacherId, bidAmount } = req.body;
        const student = await Student.findById(studentId); 
        const teacher = await Teacher.findById(teacherId);
        const bidding = new Bidding(req.body);
        if (!student) {
            return res.status(404).json({ message: `Student not found`});
        }
        if (!teacher){
            return res.status(404).json({ message: `Teacher not found`});
        }
        const bids = await Bidding.find({ studentId }).sort({ bidAmount: -1 });
        if (bids.length == 0) {
        }else{
            const highestBid = bids[0];
            if (bidAmount <= highestBid.bidAmount){
                return res.status(400).json({message: `Bidding amount must be higher than current bid of ${highestBid.bidAmount}`});
            }
          }
        if (bids.length === 0 && bidAmount < student.basePrice){
            return res.status(400).json({message: `First bid must be at least the base price of ${student.basePrice}`});
        }

        await bidding.save();
        res.status(200).json(bidding);
    }
    catch (err) {
        res.status(400).json({error : err.message });
    }
});

Router.get('/student/:studentId', async (req, res) => {
    try {
        const bids = await Bidding.find({ studentId: req.params.studentId }).sort({ bidAmount: -1 });
        res.status(200).json(bids);
    }
    catch (err) {
        res.status(400).json({error : err.message});
    }
});

module.exports = Router;