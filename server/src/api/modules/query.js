import merge from "lodash.merge"

export const controllers = {
  createOne(Model, body) {
    return Model.create(body)
  },

  updateOne(docToUpdate, update) {
    merge(docToUpdate, update)
    return docToUpdate.save()
  },

  deleteOne(docToDelete) {
    return docToDelete.remove()
  },

  getOne(Model, id) {
    return Model.findById(id).exec()
  },

  getAll(Model) {
    return Model.find({}).exec()
  },

  findByParam(Model, id) {
    return Model.findById(id).exec()
  },

  login(Model, username, password, cb) {
    Model.findOne({ username }, function(err, user) {
      if (err) cb(err)
      user.comparePassword(password, (err, isMatch) => {
        if (err) cb(err)
        return cb(null, isMatch)
      })
    })
  }
}

export const createOne = Model => (req, res, next) => {
  return controllers
    .createOne(Model, req.body)
    .then(doc => res.status(201).json(doc))
    .catch(err => next(err))
}

export const updateOne = () => async (req, res, next) => {
  const docToUpdate = req.docFromId
  const update = req.body

  return controllers
    .updateOne(docToUpdate, update)
    .then(doc => res.status(201).json(doc))
    .catch(err => next(err))
}

export const deleteOne = () => (req, res, next) => {
  return controllers
    .deleteOne(req.docFromId)
    .then(doc => res.status(201).json(doc))
    .catch(err => next(err))
}

export const getOne = Model => (req, res, next) => {
  return controllers
    .getOne(Model, req.params.id)
    .then(doc => res.status(201).json(doc))
    .catch(err => next(err))
}

export const getAll = Model => (req, res, next) => {
  return controllers
    .getAll(Model)
    .then(docs => res.status(201).json(docs))
    .catch(err => next(err))
}

export const findByParam = Model => (req, res, next, id) => {
  return controllers
    .findByParam(Model, id)
    .then(doc => {
      if (!doc) next(new Error("Not found error"))
      else {
        // this is where we actually attach the doc to the req object
        req.docFromId = doc
        next()
      }
    })
    .catch(err => next(err))
}

export const logIn = Model => (req, res, next) => {
  controllers.login(Model, req.body.username, req.body.password, function(
    err,
    isMatch
  ) {
    if (err) next(new Error("Something wrong"))
    if (!isMatch) {
      res.status(401).json(isMatch)
    } else {
      res.status(200).json(isMatch)
    }
  })
}

export const generateControllers = (Model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(Model),
    getAll: getAll(Model),
    getOne: getOne(Model),
    deleteOne: deleteOne(Model),
    updateOne: updateOne(Model),
    createOne: createOne(Model),
    login: logIn(Model)
  }
  return { ...defaults, ...overrides }
}
