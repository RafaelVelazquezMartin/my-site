const express = require("express");
const router = express.Router();
const multer = require("multer");
const mkdirp = require("mkdirp");
const checkAuth = require("../middleware/check-auth");
const checkPermission = require("../middleware/user-permissions");

const ProjectsController = require("../controllers/projects");

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

router.get("/", ProjectsController.projects_get_all);

router.get("/:project_id", ProjectsController.projects_get_project);

router.post(
  "/",
  checkAuth,
  checkPermission.permit("superuser", "user"),
  upload.array("projectImage", 5),
  ProjectsController.projects_create_project
);

router.patch(
  "/:project_id",
  checkAuth,
  checkPermission.permit("superuser", "user"),
  ProjectsController.projects_update_project
);

router.delete(
  "/:project_id",
  checkAuth,
  checkPermission.permit("superuser", "user"),
  ProjectsController.projects_delete_project
);

module.exports = router;
