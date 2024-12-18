const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone_number: { type: String, required: true, unique: true },
    otp: { type: String },
    otp_expiry: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
