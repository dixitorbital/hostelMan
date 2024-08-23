const express = require("express");
const router = express.Router();
const Hostel = require("../models/Hostel");
const { createUser } = require("../controllers/userController");
// Function to create a new hostel

// Route to create a new hostel
router.post("/", createUser);

module.exports = router;
