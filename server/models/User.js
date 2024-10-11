// import mongoose from 'mongoose';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        //somehow adjust either email is null or it is unique
        type: String,
        sparse: true,  // Ensures that `null` or missing values are allowed
        unique: false,  // Enforces uniqueness for non-null and non-empty values
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

UserSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { email: { $exists: true, $ne: null } } });

module.exports = mongoose.model('users', UserSchema);  // Creating Model from schema and exporting it, arguments are (collectionName in DB , Schema name )

