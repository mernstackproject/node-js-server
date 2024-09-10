const Example = require("../models/Practice");

// here post api of chart data with loop

exports.postdata = async (req, res , next) => {
  try {
    let total = parseInt(req.body.purchaseprice);
    for (let i = 0; i < req.body.chart; i++) {
      total = (total + parseInt(req.body.purchasegap));
     console.log(total);
       let data = await Example.create({
        purchaseprice:total,
        purchasegap:req.body.purchasegap,
        sum:req.body.sum
      });
      
      res.status(201).send({message:"success, data: " + data});
    }
  
  } catch (e) {
    res.status(404).json({ messege: e.message });
  }
};

//get api of
exports.get = async (req, res) => {
  const chart = await Example.find();
  res.status(200).json({ chart: chart });
};
