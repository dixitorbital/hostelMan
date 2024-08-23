const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  registerStudent,
  getStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  csvStudent,
} = require("../controllers/studentController");

router.post("/register-student", registerStudent);
router.post("/get-student", getStudent);
router.post("/get-all-students", getAllStudents);
router.post("/update-student", updateStudent);
router.delete("/delete-student", deleteStudent);
router.post("/csv", csvStudent);

module.exports = router;
