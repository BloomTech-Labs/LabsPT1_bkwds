/**
 * normalizeTrip
 * Signature :: Object<ServerTrip> -> { id: Object<ReduxTrip> }
 * Takes a trip object from the server & returns an object whose
 * key is the Trip _id and whose value is the Trip, except the _id
 * _id key has been replaced with id
 **/
export const normalizeTrip = ({ _id, ...rest }) => ({
  [_id]: { ...rest, id: _id }
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
 * filterTripById
 * Signature :: String -> Array<ReduxTrip> -> Array<ReduxTrip
 **/
// eslint-disable-next-line no-unused-vars
export const filterTripById = id => ({ [id]: filtered, ...rest }) => {
  return rest
}
