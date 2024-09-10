const Pairs = require("../models/Pair");
const mongoose = require("mongoose");

exports.addPair = async (req, res) => {

  try {
    let data = await Pairs.create({
      firstcoinId: req.body.firstcoinId,
      secondcoinId: req.body.firstcoinId,
    });
    res.status(200).json({ data: data, status: true });
  } catch (e) {
    console.log(e.message);
  }
};

exports.getPAairs = async (req, res) => {
  try {
    let data = await Pairs.find()
      .populate("firstcoinId")
      .populate("secondcoinId");
    res.status(200).json({ data: data, status: true });
  } catch (e) {
    console.log(e.message);
  }
};

// get single pair
exports.getSinglePair = async (req, res) => {
    // console.log("ffff" ,req.loginUserId)
  //  console.log(req.params.id)
  try {
    let data = await Pairs.find({ _id: req.params.id })
      .populate("firstcoinId")
      .populate("secondcoinId");
    // console.log("data" ,data)
    res.status(200).json({ data: data, status: true });
  } catch (e) {
    console.log(e.message);
  }
};

// update the pair
