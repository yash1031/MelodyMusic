// import mongoose from 'mongoose';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        email: true
    },
    authPlatform: {
        type: String, 
        required: true
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('users', UserSchema);  // Creating Model from schema and exporting it, arguments are (collectionName in DB , Schema name )

