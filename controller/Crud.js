const Crud = require("../models/Crud");
const crud = require("../models/Crud");
const mongoose = require("mongoose");

exports.Crudopration = async (req, res) => {
  // console.log("req.body", req.body);
  try {
    const { name, lname } = req.body;
    if (!name || !lname) {
      return res.status(400).json({ message: "fill all the fileds" });
    }
    const oldUser = await crud.findOne({ name, lname });
    if (oldUser) {
      return res.status(400).json({ message: "name and lname both are exist" });
    }
    const singlename = await crud.findOne({ name });
    if (singlename) {
      return res.status(404).json({ message: "first name aleready exists" });
    }
    const onlylname = await crud.findOne({ lname });
    if (onlylname) {
      return res.status(404).json({ message: "last name already exists" });
    }
    await crud.create({
      name: name,
      lname: lname,
    });

    return res.status(200).json({ status: true, messege: "update all data" });
  } catch (error) {
    return res.status(404).json({ messege: error.messege });
  }
};

// here get api for crud operations

exports.getcrud = async (req, res) => {
  try {
    let data = await crud.find({ deleteat: false }).sort({ _id: -1 });
    // console.log("data", data);
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(404).json({ messege: error.message });
  }
};

// here update api for crud operation

exports.updatecrud = async (req, res) => {
  console.log("req.params.id", req.params.id);
  try {
    let update = {
      deleteat: true,
    };
    console.log("update true false check", update);
    let data = await crud.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: update,
      }
    );
    console.log("data is update", data);
    return res
      .status(200)
      .json({ status: true, data: data, messege: "succesfully updated" });
  } catch (error) {
    return res.status(404).json({ messege: error.message });
  }
};

// fget single detail api for students
exports.SingleStudentNameparticular = async (req, res) => {
  console.log("reqparams", req.params);
  let id = req.params.id;
  try {
    const data = await crud.findById({ _id: id });
    res.status(200).json({ data: data, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

exports.kycstudent = async (req, res) => {
  try {
    
    let id = req.params.id;
    let data = {
      Kycstatus: "Complete",
    };
    data = await crud.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: data,
      }
    );
    console.log("kyc>>>>>>>>>>", data);
    res.status(200).json({ status: true, data: data });
  } catch (e) {
    res.status(400).json({ status: false, message: e.message });
  }
};
