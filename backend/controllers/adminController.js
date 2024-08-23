const { generateToken, verifyToken } = require("../utils/auth");
const { validationResult } = require("express-validator");
const { Admin, User, Hostel } = require("../models");
const bcrypt = require("bcryptjs");

const registerAdmin = async (req, res) => {
  try {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const {
      name,
      email,
      father_name,
      contact,
      address,
      dob,
      hostel,
      password,
    } = req.body;

    try {
      let admin = await Admin.findOne({ email });
      let shostel = await Hostel.findById(hostel);
      if (!shostel) {
        return res
          .status(400)
          .json({ success, errors: [{ msg: "hostel not found" }] });
      }
      if (admin) {
        return res
          .status(400)
          .json({ success, errors: [{ msg: "Admin already exists" }] });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let user = new User({
        email,
        password: hashedPassword,
        isAdmin: true,
      });
      let testuser = await User.findOne({ email });

      if (testuser) {
        return res
          .status(400)
          .json({ success, errors: [{ msg: "user already exist" }] });
      }
      try {
        await user.save();
        console.log("admin saved as user");
      } catch (err) {
        return res
          .status(400)
          .json({ success, errors: [{ msg: "can't create user" }] });
      }
      //   console.log(user);
      //   console.log(shostel);
      admin = new Admin({
        name,
        email,
        father_name,
        contact,
        address,
        dob,
        user: user._id,
        hostel: shostel._id,
      });

      await admin.save();

      const token = generateToken(user.id, user.isAdmin);

      success = true;
      res.json({ success, token, admin });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success, errors: [{ msg: "Server error" }] });
  }
};

const updateAdmin = async (req, res) => {
  try {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { name, email, father_name, contact, address, dob, cnic } = req.body;

    try {
      let admin = await Admin.findOne({ email });

      if (!admin) {
        return res
          .status(400)
          .json({ success, errors: [{ msg: "Admin does not exists" }] });
      }

      admin.name = name;
      admin.email = email;
      admin.father_name = father_name;
      admin.contact = contact;
      admin.address = address;
      admin.dob = dob;
      admin.cnic = cnic;

      await admin.save();

      success = true;
      res.json({ success, admin });
    } catch (error) {
      res.status(500).send("Server error");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success, errors: [{ msg: "Server error" }] });
  }
};

const getHostel = async (req, res) => {
  try {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { id } = req.body;

    let admin = await Admin.findById(id);

    if (!admin) {
      return res
        .status(400)
        .json({ success, errors: [{ msg: "Admin does not exists" }] });
    }

    let hostel = await Hostel.findById(admin.hostel);
    success = true;
    res.json({ success, hostel });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const getAdmin = async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    const { isAdmin } = req.body;
    if (!isAdmin) {
      return res.status(401).json({
        success,
        errors: [{ msg: "Not an Admin, authorization denied" }],
      });
    }
    const { token } = req.body;
    if (!token) {
      return res
        .status(401)
        .json({ success, errors: [{ msg: "No token, authorization denied" }] });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res
        .status(401)
        .json({ success, errors: [{ msg: "Token is not valid" }] });
    }

    let admin = await Admin.findOne({ user: decoded.userId }).select(
      "-password"
    );

    if (!admin) {
      return res
        .status(401)
        .json({ success, errors: [{ msg: "Token is not valid" }] });
    }

    success = true;
    res.json({ success, admin });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const deleteAdmin = async (req, res) => {
  try {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email } = req.body;

    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(400)
        .json({ success, errors: [{ msg: "Admin does not exists" }] });
    }

    const user = await User.findById(admin.user);

    await User.deleteOne(user);

    await Admin.deleteOne(admin);

    success = true;
    res.json({ success, msg: "Admin deleted" });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  registerAdmin,
  updateAdmin,
  getAdmin,
  getHostel,
  deleteAdmin,
};
