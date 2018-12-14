import jwt from "jsonwebtoken"
import config from "../../config"
import { User } from "../resources/user/user.model"

const JWT_SECRET = config.secrets.JWT_SECRET

export const register = (req, res) => {
  const { username, password, email } = req.body
  console.log(username, password, email)
  User.findOne({ username: username })
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
  const { username, password } = req.body
  console.log(username)
  User.findOne({ username: username })
    .then(user => {
      console.log(user)
      if (!user) return res.status(404).send("User does not exist")
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return res.status(401).send("Unauthorized")
        }
        if (isMatch) {
          console.log(isMatch)
          let token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: 86400 // 24 hours
          })
          const payload = { user, token }
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
  console.log(token)
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    console.log(decoded)
    if (err) {
      next(err)
      return res.status(401).send("Unauthorized")
    }
    next()
  })
}
