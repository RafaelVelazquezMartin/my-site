const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.users_signup = (req, res, next) => {
  User.find({ email: req.body.email }).then(user => {
    if (user.length >= 1) {
      res.status(422).json({
        message: "User with that email already exists"
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            role: "user"
          });
          user
            .save()
            .then(result => {
              return res.status(201).json({
                message: "User created successfully",
                createdUser: {
                  email: result.email,
                  role: result.role
                }
              });
            })
            .catch(err => {
              res.status(500).json({
                error: err
              });
            });
        }
      });
    }
  });
};

exports.users_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              role: user[0].role,
              user_id: user[0]._id
            },
            process.env.JWT_KEY,
            { expiresIn: "1hr" }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.users_update_user = (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    if (
      (ops.propName === "role" || ops.propName === "password") &&
      req.user_data.role !== "superuser"
    ) {
      continue;
    }
    updateOps[ops.propName] = ops.value;
  }
  if (
    req.user_data.role === "superuser" ||
    req.user_data.user_id === req.params.user_id
  ) {
    User.findById(req.params.user_id)
      .then(oldUser => {
        User.findByIdAndUpdate(
          req.params.user_id,
          { $set: updateOps },
          { new: true },
          (err, updatedUser) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            }
            res.status(200).json({
              message: "User updated",
              oldUser: oldUser,
              updatedUser: updatedUser
            });
          }
        );
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

exports.users_delete_user = (req, res, next) => {
  User.remove({ _id: req.params.user_id })
    .then(result => {
      res.status(200).json({
        message: "User deleted successfully"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
