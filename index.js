const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 4006;
const bodyparser = require("body-parser");
const user = require("./routes/user");
const StudentDetails = require("./routes/Studentdetails");
const Studentname = require("./routes/Singlestudentname");
const Student = require("./routes/Student");
const Example = require("./routes/Practice");
const Coursename = require("./routes/Course");
const StuFamily = require("./routes/Studentfamily");
const crypto = require("./routes/Crypto");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const crud = require("./routes/Crud");
const country = require("./routes/Country");
const Pair = require("./routes/Pair");
const state = require("./routes/State");
const Upload = require("./routes/Upload");
const transaction = require("./routes/transaction");
var CryptoJS = require("crypto-js");
const post = require("./routes/Post");
const mine = require("./routes/Mine");
const cron = require("node-cron");
const http = require("http");
const reward = require("./models/Reward")
const { resetClaimDaily } = require("./controller/user");
const userTable = require("./models/user")
dotenv.config();
const WebSocket = require("ws");
// const fileUpload = require("express-fileupload");
const cors = require("cors");

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cors());
app.use("/Uploadsfiles", express.static("Uploadsfiles"));
mongoose.connect(
  process.env.MONGO_Url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

cloudinary.config({
  cloud_name: "dehpe0h6f",
  api_key: "725739587936497",
  api_secret: "hcxdcLKnsSvDPKJ11-enlXjN9Gg",
});

app.use("/api/v1", user);
app.use("/api/v1", Student);
app.use("/api/v1", Coursename);
app.use("/api/v1", Example);
app.use("/api/v1", crud);
app.use("/api/v1", Upload);
app.use("/api/v1", StudentDetails);
app.use("/api/v1", Studentname);
app.use("/api/v1", StuFamily);
app.use("/api/v1", country);
app.use("/api/v1", state);
app.use("/api/v1", crypto);
app.use("/api/v1", Pair);
app.use(`/api/v1`, post);
app.use(`/api/v1`, transaction);
app.use(`/api/v1`, mine);
// app.use("/api/v1", uploadfiles);

app.listen(port, () => {
  console.log("server is listing", port);
});

var enxryptdata = (text, secretkey) => {
  var ciphertext = CryptoJS.AES.encrypt(text, secretkey).toString();
  console.log(ciphertext);
};

enxryptdata("shyam", "this is secret");

//  let stars = "";
//  for (let i =1; i <= 5; i++) {
//    stars  = stars + " " + "*"
//    console.log("start" ,stars);
//  }

//  let record = [
//   {
//     _id:"ddd",
//     date: new Date(),
//     type: "User",
//     status:false
//   },
//   {
//     _id:"ddd1",
//     date: "",
//     type: "User",
//     status:false
//   },
//   {
//     _id:"ddd2",
//     date: new Date(),
//     type: "User",
//     status:false
//   }
// ];

// const currentDate = new Date();

//  const newData = record.filter((i) => {
//    if (i.date && i.type) {
//      return i.type  === "User" && i.date.getTime() === currentDate.getTime();
//   }
//  });
//  for(const newDatas of newData) {
//    console.log(newDatas.status);
//     console.log(newDatas._id);
//     console.log(newDatas.type);

//  }

cron.schedule('0 0 * * *', async () => { // Runs at midnight every day
  try {
    const users = await userTable.find();
    for (const  userData of  users) {
      await checkExpiredRewards(userData._id);
    }
    await resetClaimDaily();
    console.log('Rewards checked and reset successfully');
  } catch (error) {
    console.error('Error resetting rewards:', error);
  }
});
