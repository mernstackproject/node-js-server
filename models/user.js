const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // require: true,
  },
  email: {
    type: String,
    // required: true,
    // validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    // required: true,
    // minlength: 6,
  },
  loginUserId:{
    type: String,
  },
  mobile:{
    type: String,
  } ,
  // avatar: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: true,
  //   },
  // },
  registerId:{
    type:Number,
  },
  isVerified:{
    type:Boolean,
  },
  levelStr:{
    type:Object
  },
  mobileOtp:{
    type:String
  },
  like:{
    type:Number,
    bydefault:0
  },
  from:{
type:String,
  },
  body:{
type:String,
  },
  to:{
type:String,
  },
  message:{
    type:String,
  },
  startDate:{
    type:String
  },
  endDate:{
    type:String
  },
  totalRoom:{
    type:Number
  },
  role:{
    type:String,
    enum:["admin","subAdmin" , "agentAdmin" , "hotelAdmin"],
  },
  block:{
  type:Boolean,
  bydefault:false
  }
});

module.exports = mongoose.model("User", userSchema);
