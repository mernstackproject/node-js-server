const Student = require("../models/Student");

// exports.poststudent = async (req, res, next) => {
//   try {
//     const { age , name } = req.body;
//     const findage = await Student.findOne({age})
//     const findname = await Student.findOne({name})
//     console.log("rffefef" ,Array(findage).length)
//     if(findage || findname){

//       return res.status(400).json({message:"already exists" , status:false})
//     }

//     for (var i = 1; i <= parseInt(age); i++) {
//       const data = await Student.create({
//         name: name,
//         age:age,
//       });
//       console.log("data is", data, req.body.age);
//      // res.status(200).json({data:data , status:true})
//        next();
//     }
//   } catch (err) {
//     return res.status(400).json({ message: err.message });
//   }
// };
exports.poststudent = async (req, res, next) => {
  try {
    const { age, name, fatherName, mohterName, brotherName } = req.body;
    const existAge = await Student.findOne({
      age: age,
    });
    const existName = await Student.findOne({
      name: name,
    });
    const existFatherName = await Student.findOne({
      fatherName: fatherName,
    });
    const existMotherName = await Student.findOne({
      mohterName: mohterName,
    });
    const existBrotherName = await Student.findOne({
      brotherName: brotherName,
    });

    // console.log(
    //   "exist",
    //   existAge.age,
    //   existName.name,
    //   existFatherName.fatherName,
    //   existMotherName.mohterName,
    //   existBrotherName.brotherName
    // );
    // const findname = await Student.findOne({ name });

    if (
      existAge ||
      existName ||
      existFatherName ||
      existMotherName ||
      existBrotherName
    ) {
      return res.status(400).json({
        message: `already exists ${existName ? existName.name : ""},${
          existAge ? existAge.age : ""
        }${existFatherName ? existFatherName.fatherName : ""} ${
          existMotherName ? existMotherName.mohterName : ""
        }${existBrotherName ? existBrotherName.brotherName : ""}`,
        status: false,
  
      });
    }
    //  console.log(existAge? existAge.agrg :)

    // const students = Array.from({ length: parseInt(age) }, () =>
    //   Student.create({ name, age })
    // );

    // await Promise.all(students);
    let Students = await Student.create({
      age: age,
      name: name,
      fatherName: fatherName,
      mohterName: mohterName,
      brotherName: brotherName,
    });
    // console.log("Students", Students);

    return res.status(200).json({
      message: "Students created successfully",
      status: true,
      Students: Students,
    });
  } catch (err) {
    console.log("??????????????", err.message);
    return res.status(400).json({ message: err.message });
  }
};
