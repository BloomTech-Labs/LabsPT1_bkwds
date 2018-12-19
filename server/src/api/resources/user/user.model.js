import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10

export const schema = {
  username: {
    type: String,
    required: [true, "Username is required."]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "User email is required."]
  },
  password: {
    type: String,
    require: [true, "User password is required."]
  },
  subscribed: {
    type: Boolean,
    default: false
  },
  sub_date: {
    type: Date
  },
  trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }]
}

const userSchema = new Schema(schema, { timestamps: true })

userSchema.pre("save", function(next) {
  var user = this
  if (!user.isModified("password")) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

export const User = mongoose.model("User", userSchema, "users")
