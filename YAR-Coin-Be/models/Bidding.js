const mongoose = require('mongoose');

const biddingSchema = new mongoose.Schema({
    studentId : {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    teacherId : {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
    bidAmount : Number,
    createdAt : {type: Date, default: Date.now},
});

module.exports = mongoose.model('Bidding', biddingSchema);