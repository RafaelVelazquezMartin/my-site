const express = require("express");
const router = express.Router();
const multer = require("multer");
const mkdirp = require("mkdirp");
const checkAuth = require("../middleware/check-auth");
const checkPermission = require("../middleware/user-permissions");

const TechnologiesController = require("../controllers/technologies");

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     mkdirp("./uploads/technologies/", err => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       cb(null, "./uploads/technologies/");
//     });
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     // accept/store file
//     cb(null, true);
//   } else {
//     // reject file
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1025 * 5 },
//   fileFilter: fileFilter
// });

router.get("/", TechnologiesController.technologies_get_all);

router.get(
  "/:technology_id",
  TechnologiesController.technologies_get_technology
);

router.post(
  "/",
  checkAuth,
  checkPermission.permit("superuser", "user"),
  // upload.single("logo"),
  TechnologiesController.technologies_create_technology
);

router.patch(
  "/:technology_id",
  checkAuth,
  checkPermission.permit("superuser", "user"),
  TechnologiesController.technologies_update_technology
);

router.delete(
  "/:technology_id",
  checkAuth,
  checkPermission.permit("superuser", "user"),
  TechnologiesController.technologies_delete_technology
);

module.exports = router;
