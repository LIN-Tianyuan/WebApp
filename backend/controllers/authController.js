const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config(); // Load .env file

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in the .env file');
}

/**
 * User Register
 * @param {*} req User's registration information
 * @param {*} res Return response message
 * @returns Promise<void>
 */
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Return information
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during registration' });
  }
};

// Login
exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Verify Password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Generate JWT
      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
  
      // Return Token
      res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during login' });
    }
  };
  