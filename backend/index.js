const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3000;
const mongoURI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();
app.use(cors());
app.use(express.json({ extended: false }));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/hostel", require("./routes/hostelRoutes.js"));
app.use("/api/user", require("./routes/userRoutes.js"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/complaint", require("./routes/complaintRoutes"));
app.use("/api/messoff", require("./routes/messoffRoutes"));
app.use("/api/request", require("./routes/requestRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
