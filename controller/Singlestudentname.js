const Studentname = require("../models/Singlestudentname");
const StudentDetails = require("../models/Studentdetails");

exports.Singlestuname = async (req, res) => {
  console.log(">>>>>>>>>>>", req.body);
  try {
    const { name } = req.body;
    const data = await Studentname.create({
      name: name,
    });
    res.status(200).json({ status: true, data: data });
  } catch (e) {
    res.status(400).json({ message: e.message, status: false });
  }
};

exports.Singlestugetname = async (req, res) => {
  try {
    const data = await Studentname.find();
    res.status(200).json({ status: true, data: data });
  } catch (e) {
    res.status(400).json({ message: e.message, status: false });
  }
};

// get single student name from student detail table
exports.singlestudentname = async (req, res) => {
  console.log("req.ss>>>>", req.params.id);
  try {
    const result = await StudentDetails.findById(req.params.id);
    console.log("result", result);
    const data = await Studentname.findById(result.Student_Name);
    console.log("resultdatastu", data);
    res.status(200).json({ data: data, status: true });
  } catch (e) {
    res.status(404).json({ message: e.message, status: false });
  }
};
