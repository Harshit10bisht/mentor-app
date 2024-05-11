const mongoose = require('mongoose');
// const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        // unique: true,
        // trim: true,
        // lowercase: true,
        // validate(value) {
        //     if(!validator.isEmail(value)) {
        //         throw new Error('Email is invalid')
        //     }
        // }
    },
    password: {
        type: String,
        required: true,
        // minlength: 7,
        // trim: true,
        // validate(value) {
        //     if(value.toLowerCase().includes('password')) {
        //         throw new Error('Password cannot be password')
        //     }
        // }
    }
});

// to try statics method use in models
// userSchema.statics.findByCredentials = async function(userData) {
//     const { email, password } = userData;
//     const user = await User.findOne({ email, password});
//     return user;
// };

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;