/**
 * getTripsArray
 * Signature :: Object<state> -> Array<FlattenedTrip>
 * Takes the state object and selects trips, flattening the object
 * into an array for easier consumption by the component
 */
export const getTripsArray = state =>
  Object.keys(state.trips.trips).map(key => state.trips.trips[key])

/**
 * getTripById
 * Signature :: Object<State>, String -> Object<ReduxTrip>
 * Accepts state as a whole and returns an individual, flattened trip object
 */
export const getTripById = (state, id) => findTripById(id)(state.trips.trips)

/**
 * getAllButDeleted
 * Signature :: Object<ReducerState>, String -> { keys: String, values: Object<ReduxTrip> }
 * Accepts a slice of state (at the reducer level) and returns an object that maps ids
 * as keys and whose values are trip objects
 */
export const getAllButDeleted = (state, id) =>
  filterOutTripById(id)(state.trips)

/**
 * getArchivedTripsArray
 * Signature :: Array<ReduxTrip> -> Array<ReduxTrip>
 * Takes a flat array of trips and returns only the trips that are archived.
 */
export const getArchivedTripsArray = trips =>
  trips.filter(trip => trip.isArchived)

/**
 * getUnarchivedTripsArray
 * Signature :: Array<ReduxTrip> -> Array<ReduxTrip>
 * Takes a flat array of trips and returns only the trips that are unarchived.
 */

export const getUnarchivedTripsArray = trips =>
  trips.filter(trip => !trip.isArchived)
/**
 * normalizeUser
 * Signature :: Object<ServerUser> -> { Object<ReduxUser> }
 * Takes a user object from the server & returns an object with
 * an `id` instead of an `_id` property
 **/
export const normalizeUser = ({ _id, ...rest }) => ({
  ...rest
  // id: _id
})

/**
 * normalizeTrip
 * Signature :: Object<ServerTrip> -> { id: Object<ReduxTrip> }
 * Takes a trip object from the server & returns an object whose
 * key is the Trip _id and whose value is the Trip, except the
 * `_id` key has been normalized to be just `id`
 **/
export const normalizeTrip = ({ _id, ...rest }) => ({
  // [_id]: { ...rest, id: _id }
  [_id]: { ...rest }
})

/**
 * normalizeTrips
 * Signature :: Array<ServerTrip> -> Array<{ id: Object<ReduxTrip> }>
 * Takes a trip object from the server & returns an object whose
 * key is the Trip _id and whose value is the Trip, except the _id
 * _id key has been replaced with id
 **/
export const normalizeTrips = tripsArr =>
  tripsArr.reduce((acc, curr) => {
    const myTrip = normalizeTrip(curr)
    return Object.assign(acc, myTrip)
  }, {})

/**
 * findTripById
 * Signature :: String -> { keys: String, values: Object<ReduxTrip> } -> Object<ReduxTrip>
 * Takes a string and an object whose keys are ids and returns just the object whose
 * key matches the `id` param
 **/
// eslint-disable-next-line no-unused-vars
export const findTripById = id => ({ [id]: filtered, ...rest }) => {
  return filtered
}

/**
 * filterOutTripById
 * Signature ::
 *   String -> { keys: String, values: Object<ReduxTrip> } -> { keys: String, values: Object<ReduxTrip> }
 * Takes a string and an object whose keys are ids and filters out the key/value pair
 * whose `id` matches the first argument
 */
// eslint-disable-next-line no-unused-vars
export const filterOutTripById = id => ({ [id]: filtered, ...rest }) => {
  return rest
}
