import {
  LOADING_TRIPS,
  LOADING_TRIPS_SUCCESS,
  LOADING_TRIPS_ERROR,
  CREATING_TRIP,
  CREATING_TRIP_SUCCESS,
  CREATING_TRIP_ERROR,
  CREATING_WAYPOINT,
  GET_SINGLE_TRIP
} from "../actions/types"

const defaultState = {
  loading: false,
  error: null,
  trips: {},
  activeTrip: {}
}

export const tripReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOADING_TRIPS:
      return { ...state, loading: true }
    case LOADING_TRIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        trips: action.payload.reduce((acc, curr) => {
          acc[curr._id] = curr
          return acc
        }, {})
      }
    case LOADING_TRIPS_ERROR:
      return { ...state, loading: false, error: action.payload }
    case GET_SINGLE_TRIP:
      return { ...state, activeTrip: state.trips[action.payload] }
    case CREATING_TRIP:
      return { ...state, loading: true }
    case CREATING_TRIP_SUCCESS:
      return {
        ...state,
        loading: false,
        trips: [...state.trips, action.payload]
      }
    // IMPLEMENT!
    case CREATING_WAYPOINT:
      return { ...state }
    case CREATING_TRIP_ERROR:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
