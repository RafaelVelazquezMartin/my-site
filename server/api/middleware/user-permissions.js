const User = require("../models/user");

// middleware for doing role-based permissions
exports.permit = function permit(...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1;

  // return a middleware
  return (req, res, next) => {
    User.findById(req.user_data.user_id)
      .then(user => {
        if (user && isAllowed(user.role)) next();
        // role is allowed, so continue on the next middleware
        else {
          return res.status(403).json({ message: "Forbidden" }); // user is forbidden
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };
};
