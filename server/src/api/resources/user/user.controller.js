import { User } from "./user.model"

export const getAllUsers = (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const createUser = (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })
  newUser
    .save()
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const getOneUser = (req, res) => {
  console.log(req.body)
  User.findOne({ id: req.body.id })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      return res.status(500).send(err)
    })
}

export const updateUser = (req, res) => {
  const update = req.body
  if (update.username)
    return res.status(401).send("Username change not allowed")
  if (update.password)
    return res.status(401).send("Password cannot be changed from this endpoint")
  if (update.trips)
    return res
      .status(401)
      .send("Trips cannot be modified from User model. Use Trip model instead")

  User.findOne({ _id: req.params.id })
    .then(user => {
      User.findOneAndUpdate({ _id: user._id }, update)
        .then(oldUser => {
          const payload = {
            user: oldUser,
            msg: "User was updated"
          }
          res.status(200).json(payload)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    })
    .catch(() => {
      res.status(404).send("user not found")
    })
}

export const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      res.status(202).json(user)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const getUserTrips = (req, res) => {
  User.findById(req.params.id)
    .populate("trips")
    .exec((err, user) => {
      if (err) res.status(500).send(err)
      res.status(200).json(user.trips)
    })
}
