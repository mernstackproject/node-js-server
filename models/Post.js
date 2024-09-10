const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
      file:{
        type:String
      },
      users:{
        type:mongoose.Types.ObjectId,
        ref:"User"
      },
      like:{
        type:mongoose.Types.ObjectId,
        ref:"User"
      }
  });
  
  module.exports = mongoose.model("post", postSchema);
  