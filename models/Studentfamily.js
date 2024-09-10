const mongoose = require("mongoose");

const StudentFamily = mongoose.Schema({
  Studet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentDetails",
  },
  StudentName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Studentname",
  },
  Fathername: {
    type: String,
  },
  Mothername: {
    type: String,
  },
  Qualification: {
    type: String,
  },
});

module.exports = mongoose.model("StuFamily", StudentFamily);
