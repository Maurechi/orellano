import express from 'express';
const router = express.Router();

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/login', authUser);
router.route('/').post(registerUser).get(protect, admin, getAllUsers);
// implementing middleware by using it as the first argument
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
