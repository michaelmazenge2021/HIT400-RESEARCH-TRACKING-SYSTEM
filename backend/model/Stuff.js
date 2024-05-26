const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stuffSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Student: Number,
        Admin: Number
    },
    department:{
        type: Number,
        required: true
    },
    data_of_birth: {
        type: String,
        required: true
    },
    ID_number: {
        type: String,
        required: true
    },
   
});

module.exports = mongoose.model('Stuff', stuffSchema);