const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { generateToken, verifyToken } = require("../utils/auth");
const User = require("../models/User");

exports.login = async (req, res, next) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ success, errors: [{ msg: "Invalid credentials" }] });
      }
      const token = generateToken(user.id, user.isAdmin);
      res.status(200).json({
        success: true,
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        },
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  let success = false;
  try {
    const { email, password, newPassword } = req.body;
    console.log(req.body);
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, errors: [{ msg: "User not found" }] });
      }
      console.log("user", user);
      const oldPassword = await bcrypt.compare(password, user.password);

      if (!oldPassword) {
        console.log("old pswd did not match");
        return res
          .status(400)
          .json({ success, errors: [{ msg: "Old password did not match" }] });
      }

      const salt = await bcrypt.genSalt(10);
      const newp = await bcrypt.hash(newPassword, salt);

      user.password = newp;
      try {
        await user.save();
        console.log("password updated");
      } catch (err) {
        console.log("here is err", err);
      }

      success = true;
      res.status(200).json({ success, msg: "Password changed successfully" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  } catch (error) {
    next(error);
  }
};

exports.verifySession = async (req, res, next) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success });
  }
  try {
    const { token } = req.body;
    const decoded = verifyToken(token);
    if (decoded) {
      success = true;
      return res.status(200).json({ success, data: decoded });
    }
    return res.status(400).json({ success, message: "Invalid token" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success, message: "Server Error" });
  }
};
