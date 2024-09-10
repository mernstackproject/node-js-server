const state = require("../models/State");

exports.postState = async (req, res) => {
  try {
    const { stateName, countryType } = req.body;

    const countryandState = await state.findOne({ countryType, stateName });
    if (countryandState) {
      return res.status(400).json({
        message: "State name and country type already exist",
        status: false,
      });
    }
    const stateExists = await state.findOne({ stateName });
    if (stateExists) {
      return res
        .status(400)
        .json({ message: "State name already exists", status: false });
    }
    const countryExists = await state.findOne({ countryType });
    if (countryExists) {
      return res
        .status(400)
        .json({ message: "Country type already exists", status: false });
    }

    const newData = await state.create({ stateName, countryType });

    res.status(200).json({ data: newData, status: true });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

exports.getStateData = async (req, res) => {
  try {
    let data = await state.find().populate("countryType");
    res.status(200).json({ data: data, status: true });
  } catch (e) {
    console.log(e.message);
  }
};

exports.getUpdateState = async (req, res) => {
  console.log("req.body", req.body);

  try {
    let id = req.body._id;
    console.log("id", id);
     let update = {
       stateName: req.body.stateName,
    };
    let data = await state.updateOne({ _id: id }, { $set: { stateName:update.stateName } });
    console.log("data", data);
    // return false
    res.status(200).json({ data: data, message: "ok" });
  } catch (e) {
    console.log(e.message);
  }
};
