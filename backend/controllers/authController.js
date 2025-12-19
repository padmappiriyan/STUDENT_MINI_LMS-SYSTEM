import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import validator from 'validator';
import validatePassword from '../utils/validatePassword.js';
import bcrypt from 'bcryptjs';
import { populate } from 'dotenv';
import mongoose from "mongoose";

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

export const getUserCourses = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    console.log(userId);
    const data = await User.aggregate([
      { $match: { _id: userId } },

      {
        $lookup: {
          from: "courses",
          localField: "enrolledCourses",
          foreignField: "_id",
          as: "enrolledCourses"
        }
      },

      {
        $unwind: {
          path: "$enrolledCourses",
          preserveNullAndEmptyArrays: false
        }
      },

      {
        $addFields: {
          "enrolledCourses.enrollments": {
            $filter: {
              input: "$enrolledCourses.enrollments",
              as: "enroll",
              cond: { $eq: ["$$enroll.student", userId] }
            }
          }
        }
      },

      {
        $lookup: {
          from: "lessons",
          localField: "enrolledCourses.lessons",
          foreignField: "_id",
          as: "enrolledCourses.lessons"
        }
      },

      {
        $project: {
          _id: 0,
          "enrolledCourses._id": 1,
          "enrolledCourses.title": 1,
          "enrolledCourses.description": 1,
          "enrolledCourses.thumbnail": 1,
          "enrolledCourses.image": 1,
          "enrolledCourses.duration": 1,
          "enrolledCourses.category": 1,
          "enrolledCourses.lessons": 1,
          "enrolledCourses.enrollments.enrolledAt": 1,
          "enrolledCourses.enrollments.progress": 1,
          "enrolledCourses.enrollments.status": 1,
          "enrolledCourses.enrollments.completed": 1
        }
      }
    ]);
     
    const courses = data.map(d => d.enrolledCourses);
     
    res.status(200).json({
      success: true,
      courses
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
