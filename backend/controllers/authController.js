import User from '../models/User.js';
import { generateToken, clearAuthCookie } from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic presence check
    if (!name || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide name, email, and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 6 characters long',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(409).json({
        status: 'error',
        message: 'An account with this email address already exists. Please log in instead.',
      });
    }

    // Create user in MongoDB
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    // Generate JWT token and set HttpOnly cookie
    const token = generateToken(res, user._id);

    return res.status(201).json({
      status: 'success',
      message: 'Welcome to BloomTask! Your cozy workspace has been planted 🌱',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarSeed: user.avatarSeed,
        preferredAccent: user.preferredAccent,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Could not complete registration. Please try again.',
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user and explicitly include password
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    // Generate token and set HttpOnly cookie
    const token = generateToken(res, user._id);

    return res.status(200).json({
      status: 'success',
      message: 'Welcome back to your workspace ✨',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarSeed: user.avatarSeed,
        preferredAccent: user.preferredAccent,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Could not log in at this moment. Please try again.',
    });
  }
};

// @desc    Logout user & clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req, res) => {
  clearAuthCookie(res);
  return res.status(200).json({
    status: 'success',
    message: 'Logged out successfully. Have a wonderful day! 🌸',
  });
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  return res.status(200).json({
    status: 'success',
    user: req.user,
  });
};

// @desc    Update user profile & preferences
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    if (req.body.name) user.name = req.body.name.trim();
    if (req.body.preferredAccent) user.preferredAccent = req.body.preferredAccent;

    const updatedUser = await user.save();

    return res.status(200).json({
      status: 'success',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatarSeed: updatedUser.avatarSeed,
        preferredAccent: updatedUser.preferredAccent,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Could not update profile preferences',
    });
  }
};
