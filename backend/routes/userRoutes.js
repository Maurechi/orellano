import express from 'express';
const router = express.Router();

import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/login', authUser);
router.route('/').post(registerUser);
// implementing middleware by using it as the first argument
router.route('/profile').get(protect, getUserProfile);

export default router;
