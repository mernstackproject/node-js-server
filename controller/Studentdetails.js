const StudentDetails = require("../models/Studentdetails");


exports.StuDetails = async (req, res) => {
  try {
    const { Student_Name, age, location } = req.body;
    const Data = await StudentDetails.create({
      Student_Name: Student_Name,
      location: location,
      age: age,
    });
    console.log("data>>>>>>>>>>", Data);
    res.status(200).json({ data: Data, status: true });
  } catch (e) {
    res.status(400).json({ message: e.message, status: false });
  }
};

exports.StuDetailsget = async (req, res) => {
  try {
    const data = await StudentDetails.find().populate("Student_Name");
    res.status(200).json({ data: data, status: true });
  } catch (e) {
    res.status(404).json({ message: e.message, status: false });
  }
};

// find single student name from studentdeail table

