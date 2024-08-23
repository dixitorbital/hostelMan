const express = require("express");
const router = express.Router();
const Hostel = require("../models/Hostel");
const { createHostel } = require("../controllers/hostelController.js");
// Function to create a new hostel

// Route to create a new hostel
router.post("/", createHostel);

module.exports = router;
