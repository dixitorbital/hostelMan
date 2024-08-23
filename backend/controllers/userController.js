const User = require("../models/User");

const createUser = async (req, res) => {
  const { email, password, isAdmin } = req.body;

  // Validation
  if (!email || !password || isAdmin == null) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }

  // Check if user already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Creating new user instance
    const newUser = new User({
      email,
      password,
      isAdmin,
    });

    // Saving user to the database
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
};
