import jwt from "jsonwebtoken"
import config from "../../config"
import { User } from "../resources/user/user.model"

const JWT_SECRET = config.secrets.JWT_SECRET

export const register = (req, res) => {
  const { username, password, email } = req.body
  User.findOne(username)
    .then(user => {
      if (user) {
        return res.status(404).send("Username already exists")
      }
      let newUser = new User({ username, password, email })
      newUser
        .save()
        .then(() => {
          res.status(201).send("success")
        })
        .catch(() => {
          res.status(500).send("registration failed")
        })
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const login = (req, res) => {
  const { username, password } = req.body
  User.findOne(username)
    .then(user => {
      if (!user) res.status(404).send("User not found")
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return res.status(401).send("Unauthorized")
        }
        if (isMatch) {
          let token = jwt.sign(
            { id: user._id, password: password },
            JWT_SECRET,
            {
              expiresIn: 86400 // 24 hours
            }
          )
          const payload = { user, token }
          res.status(200).json(payload)
        }
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const protect = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400).send("Bad Request")
  }
  const token = req.headers.authorization
  jwt.verify(token, JWT_SECRET, err => {
    if (err) return res.status(401).send("Unauthorized")
  })
  next()
}
