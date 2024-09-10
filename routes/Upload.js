const express = require("express");
const router = new express.Router();
const multer = require("multer");
const uploadfiles = require("../models/Upload");
const path = require("path");
const students = require("../models/Student");
const Upload = require("../models/Upload");
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
  "/postdata",
  upload.fields([{ name: "photo" }, { name: "Multiple", maxCount: 6 }]),
  async (req, res) => {
    var arrBanner = [];
    for (let j = 0; j < req.files?.Multiple?.length; j++) {
      arrBanner[j] = req.files.Multiple[j].path;
    }

    const data = await uploadfiles.create({
      Multiple: arrBanner,
    });
    return res.status(200).json({ message: true, data: data });
  }
);

// here update images

router.post(
  "/updateImage/:id",
  upload.fields([{ name: "showUpdateImages", maxCount: 6 }]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const removedImages = JSON.parse(req.body.updateImages);
      const { showUpdateImages } = req.files;
      const findData = await uploadfiles.findById(id);
      if (!findData) {
        return res.status(404).json({ message: "Data not found" });
      }
      let updatedImages;
      if (showUpdateImages && showUpdateImages.length > 0) {
        updatedImages = [
          ...removedImages,
          ...showUpdateImages.map((file) => file.path),
        ];
      } else {
        updatedImages = removedImages;
      }
      const updatedData = await uploadfiles.updateOne(
        { _id: req.params.id },
        { $set: { Multiple: updatedImages } }
      );
      return res
        .status(200)
        .json({ message: "Images updated successfully", updatedData });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/getImage", async (req, res) => {
  const data = await uploadfiles.find();
  return res.status(200).json({ status: true, data: data });
});

router.post(
  "/singleImageUpload",
  upload.fields([{ name: "image" }]),
  async (req, res) => {
    try {
      const { image } = req.files;
      const { id } = req.body;
      if (id) {
        const UpdateImageData = await Upload.findById(id);
        if (!UpdateImageData) {
          return res.status(404).json({
            message: " Couldn't find image " + id + " in upload file list ",
          });
        }
        await Upload.updateOne(
          {
            _id: UpdateImageData._id,
          },
          { $set: { file: image[0].path } }
        );
        return res.status(200).json({
          message: " Uploaded image " + id + " successfully ",
          status: true,
          file: image[0].path,
        });
      } else {
        const data = await Upload.create({
          file: image[0].path,
        });
        return res
          .status(200)
          .json({ message: "Images create successfully", data });
      }
    } catch (e) {
      console.log("e.message", e.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;
