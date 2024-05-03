const mongoose = require('mongoose');
const { unsubscribe } = require('../routes/user');

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    token: {
        type: String, 
        required: true
    }
});

// to try statics method use in models
userSchema.statics.findByCredentials = async function(userData) {
    const { email, password } = userData;
    const user = await User.findOne({ email, password});
    return user;
};

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;