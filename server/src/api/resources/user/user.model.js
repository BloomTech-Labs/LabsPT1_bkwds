import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema.Types
import bcrypt from "bcryptjs"

const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10

export const schema = {
  coordinates: {
    required: false,
    type: [Number]
  },
  customerId: {
    sparse: true,
    type: String,
    unique: true
  },
  displayName: {
    required: false,
    type: String
  },
  email: {
    required: [true, "User email is required."],
    type: String,
    unique: true
  },
  formattedAddress: {
    required: false,
    type: String
  },
  lastLogin: {
    default: Date.now(),
    required: true,
    type: Date
  },
  loginCount: {
    default: 0,
    type: Number
  },
  password: {
    required: [true, "User password is required."],
    type: String
  },
  picture: {
    required: false,
    type: String
  },
  subDate: {
    type: Date
  },
  subscribed: {
    default: false,
    type: Boolean
  },
  subscribeId: {
    sparse: true,
    type: String,
    unique: true
  },
  token: {
    type: String,
    required: false
  },
  trips: [
    {
      ref: "Trip",
      type: ObjectId
    }
  ],
  // one of: "email", "facebook" or "google"
  type: {
    type: String,
    required: true,
    default: "email"
  },
  // Emergency contact info
  contact: {
    name: String,
    number: String
  }
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

userSchema.set("toJSON", {
  transform: function(doc, ret) {
    let retJson = {
      coordinates: ret.coordinates,
      createdAt: ret.createdAt,
      customerId: ret.customerId,
      displayName: ret.displayName,
      email: ret.email,
      formattedAddress: ret.formattedAddress,
      id: ret._id,
      lastLogin: ret.lastLogin,
      loginCount: ret.loginCount,
      picture: ret.picture,
      subDate: ret.subDate,
      subscribed: ret.subscribed,
      subscribeId: ret.subscribeId,
      token: ret.token,
      trips: ret.trips,
      type: ret.type,
      updatedAt: ret.updatedAt
    }
    return retJson
  }
})

mongoose.set("useCreateIndex", true)
mongoose.set("useFindAndModify", false)
export const User = mongoose.model("User", userSchema, "users")
