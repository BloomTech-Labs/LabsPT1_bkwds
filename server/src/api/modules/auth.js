import jwt from "jsonwebtoken"
import config from "../../config"
import { User } from "../resources/user/user.model"

const JWT_SECRET = config.secrets.JWT_SECRET

export const register = (req, res) => {
  const { email, password, ...rest } = req.body
  User.findOne({ email: email })
    .then(existingUser => {
      if (existingUser) return res.status(404).send("Email already exists")
      let user = new User({ email, password, ...rest })
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      })
      const payload = { user, token }
      user
        .save()
        .then(() => {
          res.status(201).json(payload)
        })
        .catch(err => {
          const message = err.message
          res.status(500).json({
            status: "registration failed",
            msg: message
          })
        })
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const login = (req, res) => {
  const { email, password } = req.body
  User.findOneAndUpdate(
    { email: email },
    // Update lastLogin, increment loginCount:
    { lastLogin: Date.now(), $inc: { loginCount: 1 } },
    // Get back old user, not new one!
    { new: false }
  )
    .populate("trips")
    .exec()
    .then(oldUser => {
      if (!oldUser) return res.status(404).send("User does not exist")
      oldUser.comparePassword(password, (err, isMatch) => {
        if (err) {
          return res.status(500).send("Error checking use password")
        }
        if (isMatch) {
          // let token = generateToken(user)
          const token = jwt.sign({ id: oldUser._id }, JWT_SECRET, {
            expiresIn: 86400 // 24 hours
          })

          const payload = { user: oldUser, token }
          res.status(200).json(payload)
        } else {
          return res.status(401).send("Invalid password")
        }
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const protect = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).send("Bad Request")
  }
  let token = req.headers.authorization
  token = token.replace("Bearer ", "")
  jwt.verify(token, JWT_SECRET, err => {
    if (err) {
      next(err)
      return res.status(401).send("Unauthorized")
    }

    next()
  })
}

export const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body
  // find if old password is valid
  User.findOne({ email: email })
    .then(oldUser => {
      if (!oldUser) return res.status(404).send("User does not exist")
      oldUser.comparePassword(oldPassword, (err, isMatch) => {
        if (err) {
          return res.status(401).send("Unauthorized")
        }
        if (isMatch) {
          // change to new password
          oldUser.password = newPassword
          oldUser
            .save()
            .then(newUser => {
              res.status(200).send(newUser)
            })
            .catch(err => {
              const message = err.message
              res.status(500).json({
                status: "change password failed",
                msg: message
              })
            })
        } else {
          return res.status(401).send("Invalid old password")
        }
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
}
