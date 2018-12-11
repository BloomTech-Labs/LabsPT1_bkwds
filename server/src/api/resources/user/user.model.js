import mongoose from 'mongoose'

export const schema = {
  type: {
    type: String,
    default: 'anonymous',
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'User email is required.'],
  },
  password: {
    type: String,
    require: [true, 'User password is required.']
  },
}

const userSchema = new mongoose.Schema(schema, { timestamps: true })

export const User = mongoose.model('user', userSchema)
