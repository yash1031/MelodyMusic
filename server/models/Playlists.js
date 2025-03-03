const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
    mobile: {
        type: String,
        required: true
    },
    OTP: {
        type: String,
        required: true
    },
    expiry: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('playlist', PlaylistSchema); // Creating Model from schema and exporting it, arguments are (model name , Schema name )

