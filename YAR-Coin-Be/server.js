const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const dotenv = require('dotenv');
dotenv.config();
const studentRoutes = require('./routes/studentRoutes');
const Student = require('./models/Student');
const teacherRoutes = require('./routes/teacherRoutes');
const biddingRoutes = require('./routes/biddingRoutes');
const Bidding = require('./models/Bidding');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/biddings', biddingRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.log(err));

cron.schedule('* * * * *', async () => {
    console.log("Running auction settlements...");
    const students = await Student.find({ ownedBy: null });
    for (let student of students) {
        const lastBid = await Bidding.find({ studentId: student._id }).sort({ createdAt: -1 }).limit(1);
        
        const auctionEnd = 1 * 60 * 1000; // 3 * 24 * 60 * 60 * 1000
        if (new Date() - lastBid[0].createdAt >= auctionEnd) {
            const highestBid = await Bidding.find({ studentId: student._id }).sort({ bidAmount: -1 }).limit(1);
            student.ownedBy = highestBid[0].teacherId;
            await student.save();
        }else{
            console.log(`Auction is still ongoing.`);
        }
    }
    console.log("Finished auction settlements...");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});