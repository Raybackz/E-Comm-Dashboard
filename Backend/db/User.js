const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profilePic: String,  // Store the filename of the profile picture
});

module.exports = mongoose.model('User', userSchema);