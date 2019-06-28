const mongoose = require("mongoose");
const fs = require("fs");
const Project = require("../models/project");
const Image = require("../models/image");

exports.images_get_all = (req, res, next) => {
  Image.find()
    .select("-_v")
    .then(images => {
      if (images.length > 0) {
        res.status(200).json({
          count: images.length,
          images: images
        });
      } else {
        res.status(404).json({
          message: "There are currently no images available"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.images_upload_images = (req, res, next) => {
  var images = new Array();
  if (req.files) {
    req.files.forEach((image, i) => {
      const newImage = new Image({
        _id: new mongoose.Types.ObjectId(),
        imagePath: image.path,
        filename: image.originalname
      });
      newImage.save();
      images.push(newImage);
    });
    return res.status(201).json({
      message: "Images succesfully uploaded",
      uploadedImgs: images
    });
  }
  return res.status(500).json({
    message: "No files"
  });

  //   newImage
  //     .save()
  //     .then(result => {
  //       res.status(201).json({
  //         message: "Image uploaded successfully",
  //         uploadedImg: {
  //           _id: result._id,
  //           imagePath: result.imagePath,
  //           filename: result.filename
  //         }
  //       });
  //     })
  //     .catch(err => {
  //       res.status(500).json({
  //         error: err
  //       });
  //     });
  // }
};

exports.images_delete_image = (req, res, next) => {
  Image.findByIdAndRemove(req.params.image_id, (err, image) => {
    if (err || image === null) {
      console.error(err);
      return res.status(500).json({
        error: err
      });
    }
    fs.unlink(image.imagePath, () => {
      res.status(200).json({
        message: "Image successfully deleted",
        deletedImage: image
      });
    });
  });
};
