const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0//", salt);
const jwt = require("jsonwebtoken");

const User = require("../models/users");

exports.user_get_all = async (req, res, next) => {
  try {
    const users = await User.find().select("email address").exec();
    res.status(200).json({
      message: "this is all users",
      count: users.length,
      users,
    });
  } catch (err) {
    console.log(err),
      res.status(500).json({
        message: "No found Users",
        error: err,
      });
  }
};

exports.user_signup = async (req, res, next) => {
  try {
    await User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        var regPass = req.body.password.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        );
        if (user.length >= 1 || !regPass) {
          return res.status(409).json({
            err: "Địa chỉ Email này đã có người sử dụng"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                userName: req.body.userName,
                email: req.body.email,
                password: hash,
              });
              let token = jwt.sign(user.toJSON(), process.env.SECRETJSON, {
                expiresIn: "168h",
              });
              user
                .save()
                .then((result) => {
                  console.log(result);
                  res.status(201).json({
                    success: true,
                    message: "User created",
                    user: token,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
        }
      });
  } catch (err) {
    console.log(err),
      res.status(500).json({
        message: "Some thing wrong",
        error: err,
      });
  }
};

exports.user_profile = async (req, res, next) => {
  try {
    let foundUser = await User.findOne({ _id: req.decoded._id })
    .populate('address')
    .select()
    .exec()
    if (foundUser) {
      res.json({
        success: true,
        user: foundUser,
      });
    }
  } catch (err) {
    console.log(err), res.status(500).json({ error: err });
  }
};

exports.user_login = async (req, res) => {
  try {
    let foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      res.status(403).json({
        success: false,
        message: "authentication faled, USer doesn't exits",
      });
    } else {
      if (foundUser.comparePassword(req.body.password)) {
        let token = jwt.sign(foundUser.toJSON(), process.env.SECRETJSON, {
          expiresIn: "168h",
        });
        res.json({
          success: true,
          token: token,
          email: foundUser.email,
          name: foundUser.name,
        });
      } else {
        res.status(403).json({
          success: false,
          message: "authentication faled, wrong Password",
        });
      }
    }
  } catch (err) {
    console.log(err), res.status(500).json({ error: err });
  }
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
