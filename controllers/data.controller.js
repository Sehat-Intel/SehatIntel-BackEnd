var mongoose = require('mongoose');
const Data = require('../models/data.model');


exports.createData = async (req, res) => {
    const data = new Data({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      age: req.body.age,
      diseasesName: req.body.diseasesName,
      doctorsFeedback: req.body.doctorsFeedback,
      doctorsName: req.body.doctorsName,
      email: req.body.email,
      hospitalsName: req.body.hospitalsName,
      labReportFileId: req.body.labReportFileId,
      labReportFileUrl: req.body.labReportFileUrl,
      prescription: req.body.prescription,
      caseStartDate: req.body.caseStartDate,
      caseEndDate: req.body.caseEndDate
    });
    return data
      .save()
      .then((newData) => {
        return res.status(201).json({
          success: true,
          message: 'User Data created successfully',
          data: { data: newData}
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.',
          error: error.message,
        });
      });
  } 