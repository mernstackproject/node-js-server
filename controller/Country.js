const country = require("../models/Country");

exports.postCountry = async (req, res) => {
  try {
    // const { Student_Name, age, location } = req.body;
    let findname = await country.findOne({ countryName: req.body.countryName });
    console.log(findname);
  
    if (findname?.countryName.toLowerCase()) {
      return res.status(400).json({ message: "aleready exists" });
    } else {
      const Data = await country.create({
        countryName: req.body.countryName,
      });
      return res.status(200).json({ data: Data, status: true });
    }
  } catch (e) {
    return res.status(400).json({ message: e.message, status: false });
  }
};
exports.getCountry = async (req, res) => {
  try {
    // const { Student_Name, age, location } = req.body;
    const data = await country.find();
    // console.log("countryname", Data);
    res.status(200).json({ data: data, status: true }).sort({ _id: -1 });
  } catch (e) {
    res.status(400).json({ message: e.message, status: false });
  }
};
