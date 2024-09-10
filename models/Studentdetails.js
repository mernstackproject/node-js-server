const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
   
    age:{
        type:Number,
    },
    location:{
        type:String,
    },
    Student_Name: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studentname",
    
    },

})

module.exports = mongoose.model("StudentDetails" , StudentSchema)