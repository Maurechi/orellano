import mongoose from 'mongoose'


// Creating User Schema
const userSchema = mongoose.Schema({
  // You can pass name: string. 
  // But since we want it to be required we pass an object
  name: {
    type: String,
    required: true,
    unique: true
  }
  password: {
    type: String,
    required: true
  }
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

// Creating Model that will conform to our schema with its required fields
const User = mongoose.model('User', userSchema)

export default User