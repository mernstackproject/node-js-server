const { json } = require("body-parser");
const Coursename = require("../models/Course");
var ObjectId = require("mongodb").ObjectID;

exports.postcourse = async (req, res) => {
   console.log("rewq.bosy" , req.body)
  try {
     
    const course = await Coursename.create({
      coursename: req.body.coursename,
      course_id: req.body.course_id,
    });
    console.log("courses is", course);
    res.status(201).json({ course:course });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// here  get api of course.
exports.getcourse = async (req, res) => {
  console.log("all datas" , req.body)
  try {
    const course = await Coursename.find().populate("course_id");
    console.log("course data is" , course );
    res.status(200).json({ course: course , status:true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// single api

exports.single = async (req, res) => {
  console.log("req" , req.params , req.body)
  try {
    const data = await Coursename.findById( req.params.id ).populate(
    "course_id"
    );
    res.status(200).json({ data: data });
    console.log("data" , data)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
