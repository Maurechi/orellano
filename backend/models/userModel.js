import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Creating User Schema
const userSchema = mongoose.Schema(
  {
    // You can pass name: string.
    // But since we want it to be required we pass an object
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Password Auth Method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// this will automatically run before saving. We don't need to import it anywhere
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Creating Model that will conform to our schema with its required fields
const User = mongoose.model('User', userSchema);

export default User;
