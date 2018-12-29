import {
  ARCHIVING_TRIP,
  ARCHIVING_TRIP_SUCCESS,
  ARCHIVING_TRIP_ERROR,
  LOADING_TRIPS,
  LOADING_TRIPS_SUCCESS,
  LOADING_TRIPS_ERROR,
  GET_SINGLE_TRIP,
  CREATING_TRIP,
  CREATING_TRIP_SUCCESS,
  CREATING_TRIP_ERROR,
  CREATING_WAYPOINT,
  DELETING_TRIP,
  DELETING_TRIP_SUCCESS,
  DELETING_TRIP_ERROR
} from "../actions/types"

import {
  filterTripById,
  normalizeTrip,
  normalizeTrips
} from "../../utils/selectors"

const defaultState = {
  pending: false,
  error: null,
  trips: {},
  activeTrip: {}
}

export const tripReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOADING_TRIPS:
      return { ...state, pending: true }
    case LOADING_TRIPS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        trips: normalizeTrips(action.payload)
      }
    case LOADING_TRIPS_ERROR:
      return { ...state, pending: false, error: action.payload }
    case GET_SINGLE_TRIP:
      return { ...state, activeTrip: state.trips[action.payload] }

    case CREATING_TRIP:
      return { ...state, pending: true }
    case CREATING_TRIP_SUCCESS:
      const newTrip = normalizeTrip(action.payload)
      return {
        ...state,
        pending: false,
        trips: { ...state.trips, ...newTrip }
      }
    case CREATING_TRIP_ERROR:
      return { ...state, pending: false, error: action.payload }
    default:
      return state

    case DELETING_TRIP:
      // Make activeTrip an empty object in case we're deleting activeTrip
      return { ...state, pending: true, activeTrip: {} }
    case DELETING_TRIP_SUCCESS:
      return {
        ...state,
        pending: false,
        trips: filterTripById(action.payload)(state.trips)
      }
    case DELETING_TRIP_ERROR:
      return { ...state, pending: false, error: action.payload }

    case ARCHIVING_TRIP:
      return { ...state, pending: true }
    case ARCHIVING_TRIP_SUCCESS:
      return { ...state }
    // return { ...state, pending: false,  }
    case ARCHIVING_TRIP_ERROR:
      return { ...state, pending: false, error: action.payload }

    // IMPLEMENT!
    case CREATING_WAYPOINT:
      return { ...state, pending: true }
  }
}
