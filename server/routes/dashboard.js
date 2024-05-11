const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/dashboard', auth, async (req, res) => {
    console.log("DASHBOARD : ", req.body);
    
    try {
        // const data = await User.find();
        const data = "HELLO, WELCOME TO DASHBOARD"
        console.log("DATA : ", data);
        if(data)
            res.status(200).json({ data });
    }
    catch(e) {
        res.status(400).send(e);
    }
});

module.exports = router;