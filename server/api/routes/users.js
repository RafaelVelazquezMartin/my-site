const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkPermission = require("../middleware/user-permissions");

const UsersController = require("../controllers/users");

router.post("/signup", UsersController.users_signup);

router.post("/login", UsersController.users_login);

router.patch(
  "/:user_id",
  checkAuth,
  checkPermission.permit("superuser", "user"),
  UsersController.users_update_user
);

router.delete(
  "/:user_id",
  checkAuth,
  checkPermission.permit("superuser"),
  UsersController.users_delete_user
);

module.exports = router;
