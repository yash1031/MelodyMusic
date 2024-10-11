const mongoose = require('mongoose');
const { Schema } = mongoose;

const PhoneValidationSchema = new Schema({
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

module.exports = mongoose.model('phoneValidation', PhoneValidationSchema); // Creating Model from schema and exporting it, arguments are (model name , Schema name )

