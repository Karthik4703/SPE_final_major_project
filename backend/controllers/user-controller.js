const User = require("../model/User.js");
const bcrypt = require("bcryptjs");
const logger = require("../logger/logging.js");

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    logger.info("Users fetched successfully");
    return res.status(200).json({ users });
  } catch (err) {
    logger.error(`Error fetching users: ${err.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      logger.info(`Signup failed. User with email ${email} already exists.`);
      return res.status(400).json({ error: "User Already exists! Login Instead" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10); // Adjust the number of bcrypt rounds as needed
    const user = new User({
      name,
      email,
      password: hashedPassword,
      blogs: [],
    });

    await user.save();

    logger.info(`User signed up successfully: ${user.email}`);
    
    return res.status(201).json({ user });
  } catch (error) {
    logger.error(`Error signing up: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      logger.warn("User not found. Login aborted.");
      return res.status(404).json({ error: "User Not Found! Register First" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (isPasswordCorrect) {
      logger.info("Login successful");
      return res.status(200).json({ message: "Login Successful!!!", user: existingUser });
    } else {
      logger.error("Incorrect password. Login aborted.");
      return res.status(400).json({ error: "Incorrect Password!" });
    }
  } catch (error) {
    logger.error(`Error during login: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
