import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Handling token authentication
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // splitting with a space will give us index [0] = bearer, index [1] = the whole token
      token = req.headers.authorization.split(' ')[1];
      // decoded token. We verify by passing the token and token secret from .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // this will find our user model and add it to the request to be accessed later
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
