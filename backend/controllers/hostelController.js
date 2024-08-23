const Hostel = require("../models/Hostel.js");
const createHostel = async (req, res) => {
  const { name, location, rooms, capacity, vacant } = req.body;

  // Validation
  if (
    !name ||
    !location ||
    rooms == null ||
    capacity == null ||
    vacant == null
  ) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }

  // Creating new hostel instance
  const newHostel = new Hostel({
    name,
    location,
    rooms,
    capacity,
    vacant,
  });

  try {
    // Saving hostel to the database
    const hostel = await newHostel.save();
    res.status(201).json(hostel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { createHostel };
