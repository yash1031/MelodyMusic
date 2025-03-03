const mongoose = require('mongoose');
const { Schema } = mongoose;

const SongsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artists: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    image_path: {
        type: String,
    },
    link: {
        type: String,
    },
    old_new: {
        type: String
    }
});

module.exports = mongoose.model('songs', SongsSchema); // Creating Model from schema and exporting it, arguments are (model name , Schema name )

