const express = require("express");
const router = express.Router();
const multer = require("multer");
const mkdirp = require("mkdirp");

const ImagesController = require("../controllers/images");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var today = dd + "-" + mm + "-" + yyyy;
    mkdirp("./uploads/" + today, err => {
      if (err) {
        console.log(err);
        return;
      }
      cb(null, "./uploads/" + today + "/");
    });
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[1]
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // accept/store file
    cb(null, true);
  } else {
    // reject file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1025 * 5 },
  fileFilter: fileFilter
});

router.get("/", ImagesController.images_get_all);

router.post(
  "/upload",
  upload.array("image[]", 5),
  ImagesController.images_upload_images
);

router.delete("/:image_id", ImagesController.images_delete_image);

/* TODO:
router.get("/:image_id", ImagesController.images_get_image);

router.patch("/:image_id", ImagesController.images_update_image);

router.delete("/:image_id", ImagesController.images_delete_image);
*/
module.exports = router;
