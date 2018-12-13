import { User } from "./user.model"

export const getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    res.send(users)
  })
}

export const createUser = (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })
  newUser.save(err => {
    if (err) throw err
  })
  res.send(newUser)
}
