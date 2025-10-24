const Teacher = require('../models/Teacher');
const express = require('express');
const Router = express.Router();
const ethers = require('ethers');
const dotenv = require('dotenv');
dotenv.config();

let hardhatAccounts = [];
const provider = new ethers.providers.JsonRpcProvider(process.env.HARDHAT_RPC);
(async () => {
    hardhatAccounts = await provider.listAccounts();
})();

let currentAccountIndex = 0;

Router.post('/', async (req, res) => {
    try {
        if (currentAccountIndex >= hardhatAccounts.length) {
            return res.status(400).json({ error: 'No more hardhat accounts available.' });
        }
        const walletAddress = hardhatAccounts[currentAccountIndex];
        req.body.walletAddress = walletAddress;
        currentAccountIndex++;

        const teacher = new Teacher(req.body);
        await teacher.save();
        res.status(200).json(teacher);
    }
    catch (err){
        res.status(400).json({error : err.message});
    }
});

Router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    }
    catch (err) {
        res.status(400).json({error : err.message});
    }
});

module.exports = Router;