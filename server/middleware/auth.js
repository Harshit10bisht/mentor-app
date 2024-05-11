const jwt = require('jsonwebtoken');
const { mongoose } = require("mongoose");
const User = require("../models/user");
require('dotenv').config();

const auth = async (req, res, next) => {
    console.log("Into Middleware"); 
    // Will store token in cookies because of its benefits like client side flexibility and security concerns.
    
    try{
        const token = req.cookies.accessToken;
        // console.log("TOKEN : ", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ '_id': decoded._id });

        if(!user) {
            throw new Error(e)
        }
        console.log("Authenticated successfully")
        next();
    }
    catch(e) {
        res.status(401).send({error: 'Please authenticate'})
    }
};

module.exports = auth;