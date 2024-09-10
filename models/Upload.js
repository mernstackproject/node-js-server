const mongoose = require("mongoose");

const Uploadfiles = new mongoose.Schema({
    name:{
        type:String,
    },
    file:{
        // fieldname: String,
        // originalname: String,
        // encoding: String,
        // mimetype: String,
        // destination: String,
        // filename: String,
        // path: String,
        // size: Number
        type:String,
    },
    Multiple:{
        type:Array,
    },
    Userrecord:{
        type:Array
    }

})

module.exports = mongoose.model("uploadfiles" , Uploadfiles)