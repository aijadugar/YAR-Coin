const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name : String,
    email : {type: String, unique: true},
    walletAddress : String,
    skills : [String],
    achievements : [String],
    basePrice : Number,
    ownedBy : { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', default: null },
    createdAt : {type: Date, default: Date.now}, 
});

module.exports = mongoose.model('Student', studentSchema);