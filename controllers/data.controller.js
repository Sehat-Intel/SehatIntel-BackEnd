var mongoose = require('mongoose');
const Data = require('../models/data.model');
const cloudinary = require('../utils/cloudinary');


exports.createData = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.body.labReportFile);
  console.log(result);

    const data = new Data({
      _id: mongoose.Types.ObjectId(),
      // name: req.body.name,
      // age: req.body.age,
      // diseasesName: req.body.diseasesName,
      // doctorsFeedback: req.body.doctorsFeedback,
      // doctorsName: req.body.doctorsName,
      // email: req.body.email,
      // hospitalsName: req.body.hospitalsName,
      labReportFileId: result.public_id,
      labReportFileUrl: result.secure_url
      // prescription: req.body.prescription
    });
    return data
      .save()
      .then((newData) => {
        return res.status(201).json({
          success: true,
          message: 'User Data created successfully',
          data: { data: newData, result: result}
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