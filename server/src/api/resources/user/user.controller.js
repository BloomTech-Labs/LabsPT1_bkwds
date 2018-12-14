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
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const getOneUser = (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          // Generate and send token here
          res.status(200).json(user)
        }
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
}

export const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => {
      res.status(204).json(user)
    })
    .catch(err => {
      res.status(500).send(err)
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
