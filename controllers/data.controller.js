var mongoose = require('mongoose');
const Data = require('../models/data.model');


exports.createData = async (req, res) => {
const data = new Data({
  _id: mongoose.Types.ObjectId(),
  name: req.body.name,
  age: req.body.age,
  phone: req.body.phone,
  diseasesName: req.body.diseasesName,
  doctorsFeedback: req.body.doctorsFeedback,
  doctorsName: req.body.doctorsName,
  email: req.body.email,
  hospitalsName: req.body.hospitalsName,
  labReportFileId: req.body.labReportFileId,
  labReportFileUrl: req.body.labReportFileUrl,
  prescription: req.body.prescription,
  labReportType: req.body.labReportType,
  caseStartDate: req.body.caseStartDate,
  caseEndDate: req.body.caseEndDate
});
return data
  .save()
  .then((newData) => {
    return res.status(201).json({id: newData._id});
  })
  .catch((error) => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message,
    });
  });
};


exports.getAllData = (req, res) => {
  Data.find({}).then(allData => {
    res.json(allData);
  }).catch(error => {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message,
    });
  })
}