import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import validator from 'validator';
import validatePassword from '../utils/validatePassword.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // check if user Email is valid or not
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please Enter Valid Email" });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.json({ message: passwordError });
    }

    //hasing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create new user
    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || 'student',
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log("Login request body:", req.body);
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                 success:false,
                 message: 'Invalid Password' });
        }
       

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
