const mongoose = require("mongoose");

const studentschema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    age: {
      type: Number,
      // required: true,
    },
    fatherName: {
      type: String,
    },
    mohterName: {
      type: String,
    },
    brotherName: {
      type: String,
    },
    Userrecord:{
      type:Array,
    },
    uploadId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "uploadfiles",
    }
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentschema);
