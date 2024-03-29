const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    diseasesName: {
        type: String,
        required: true
    },
    doctorsFeedback: {
        type: String,
        required: true
    },
    doctorsName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    hospitalsName: {
        type: String,
        required: true
    },
    prescription: {
        type: String,
        required: true
    },
    labReportFileId: {
        type: String,
        required: true
    },
    labReportFileUrl: {
        type: String,
        required: true
    },
    labReportType: {
        type: String,
        required: true
    },
    caseStartDate: {
        type: Date,
        // required: true
    },
    caseEndDate: {
        type: Date,
        // required: true
    },
});


const Data = mongoose.model('Data', DataSchema);

module.exports = Data;