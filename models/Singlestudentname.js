const mongoose = require('mongoose');

const Studentname = mongoose.Schema({
   
   name:{
    type:String,
   }
})

module.exports = mongoose.model("Studentname" , Studentname)