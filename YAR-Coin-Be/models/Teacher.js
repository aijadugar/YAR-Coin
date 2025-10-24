const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
	name : String,
	email : {type: String, unique: true},
	walletAddress : String,
	specialization : String,
	purse : Number,
	createdAt : {type: Date, default: Date.now},
});

module.exports = mongoose.model('Teacher', teacherSchema);