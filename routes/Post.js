const express = require("express");
const router = express.Router();
const multer = require("multer");
const post = require("../models/Post");
const { verifyToken } = require("../Middelware/Auth");
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "Uploadsfiles");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only image is allowed"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

router.post(
  "/posts",
  upload.fields([{ name: "image" }]),
  verifyToken,

  async (req, res) => {
    console.log("sdasdsacxzcxdrs", req.files);

    try {
      const userid = req.user.id;
      const data = await post.create({
        file: req.files.image[0].filename,
        users: userid,
      });

      console.log("data", data);

      // data.save();
      res.status(200).json({ message: true, data: data });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
);
module.exports = router;

router.get("/getpost" , verifyToken , async(req,res)=>{
  try{
     const data = await post.find()
     res.status(200).json({ message: true, data: data})
  }catch(e){
    res.status(400).json({message:e.message})
  }
})