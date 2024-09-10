const StuFamily = require("../models/Studentfamily");

exports.Studentfamilydetails = async (req, res) => {

  console.log("req.body", req.body);
  try {
    if(!req.body.Mothername || !req.body.Fathername){
      return res.status(400).json({message:"This field is required"})
    }
    if(!req.body.Qualification){
      return res.status(400).json({message:"This field is requireds"})
    }
    const data = await StuFamily.create({
      Studet: req.body.Studet,
      StudentName: req.body.StudentName,
      Mothername: req.body.Mothername,
      Fathername: req.body.Fathername,
      Qualification: req.body.Qualification,
    });

    console.log("postdata", data);

    return res.status(200).json({ status: true, data: data });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.getstudentfamily = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const data = await StuFamily.find({
      Studet: req.body.StudentName,
    }).populate("StudentName");
    console.log("data", data);
    res.status(200).json({ status: true, data: data });
  } catch (e) {
    res.status(400).json({ message: e.message, status: false });
  }
};
