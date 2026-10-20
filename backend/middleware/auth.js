import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check HttpOnly cookie
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // 2. Check Authorization header (Bearer <token>) as fallback
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Not authorized, please log in to enter your workspace',
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'bloomtask_cozy_jwt_secret_dev_key_2026';
    const decoded = jwt.verify(token, secret);

    // Fetch user without password
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User session invalid or user no longer exists',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return res.status(401).json({
      status: 'error',
      message: error.name === 'TokenExpiredError'
        ? 'Session expired, please log in again'
        : 'Invalid authorization token, please log in again',
    });
  }
};

export default protect;
