const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const generateAuth = async function (user) {
    // console.log("GEN_INSIDE : ", user);
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    // console.log("GEN_INSIDE 2 : ", token);
    user.token = token;
    await user.save();
    return user;
}

module.exports = generateAuth;