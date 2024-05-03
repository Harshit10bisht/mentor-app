const express = require('express');
const router = express.Router();
const User = require('../models/user');
const generateToken = require('../middleware/token');

router.post('/signup', async (req, res) => {
    console.log("SIGNUP : ", req.body);
    const new_user = new User(req.body);

    try {
        const is_present = await User.exists({ email: new_user.email });
        if(!is_present) {
            await new_user.save();
            res.status(200).json({ msg: `${new_user.email} is created successfully` });
        }
        else {
            res.status(409).json({ msg: `${new_user.email} account already exists` });
        }
    }
    catch(e) {
        res.status(400).send(e);
    }
});

router.post('/login', async (req, res) => {
    console.log("LOGIN : ", req.body);
    try {
        const user = await User.findByCredentials(req.body);
        await generateToken(user);
        if(!user)
            res.status(400).send({ msg: "Unable to login, either email or password is wrongly typed" });
        else
            res.status(200).send({ msg: "Logged in successfully" });
    }
    catch(e) {
        res.status(400).send(e);
    }
})

module.exports = router;