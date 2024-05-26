const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PdfDataSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    keywords: {
        type: Array,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        required: true
    },
    date_posted: {
        type: Date,
        required: true
    },
    faculty: {
        type: Number,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
   reference: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('PdfData', PdfDataSchema);