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
        unique: true,
        email: true
    },
    mobile:{
        type: String,
        unique: true,
        mobile: true
    },
    authPlatform: {
        type: String, 
        required: true
    },
    password: {
        type: String
    },
    dob: {
        type: Date,
        // required: true
    },
    gender: {
        type: String,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('users', UserSchema);  // Creating Model from schema and exporting it, arguments are (collectionName in DB , Schema name )

