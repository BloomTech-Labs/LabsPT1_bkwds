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

  getOne(docToGet) {
    return Promise.resolve(docToGet)
  },

  getAll(Model) {
    return Model.find({}).exec()
  },

  findByParam(Model, id) {
    return Model.findById(id).exec()
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

export const getOne = () => (req, res, next) => {
  return controllers
    .getOne(req.docFromId)
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

export const generateControllers = (Model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(Model),
    getAll: getAll(Model),
    getOne: getOne(Model),
    deleteOne: deleteOne(Model),
    updateOne: updateOne(Model),
    createOne: createOne(Model)
  }
  return { ...defaults, ...overrides }
}
