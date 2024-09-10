const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  coursename: {
    type: String,
  },
  course_id: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    
    },

});

module.exports = mongoose.model("Coursename", Course);
