import {
  LOADING_TRIPS,
  LOADING_TRIPS_SUCCESS,
  LOADING_TRIPS_ERROR,
  LOADING_ARCHIVED_TRIPS,
  LOADING_ARCHIVED_TRIPS_SUCCESS,
  LOADING_ARCHIVED_TRIPS_ERROR,
  GET_SINGLE_TRIP,
  CREATING_TRIP,
  CREATING_TRIP_SUCCESS,
  CREATING_TRIP_ERROR,
  CREATING_WAYPOINT,
  DELETING_TRIP,
  DELETING_TRIP_SUCCESS,
  DELETING_TRIP_ERROR,
  TOGGLE_ARCHIVE_TRIP,
  TOGGLE_ARCHIVE_TRIP_SUCCESS,
  TOGGLE_ARCHIVE_TRIP_ERROR
} from "../actions/types"

import {
  normalizeTrip,
  normalizeTrips,
  getArchivedTripsArray,
  getAllButDeleted,
  getUnarchivedTripsArray
} from "../../utils/selectors"

const defaultState = {
  pending: false,
  error: null,
  trips: {},
  activeTrip: ""
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
        trips: normalizeTrips(getUnarchivedTripsArray(action.payload))
      }
    case LOADING_TRIPS_ERROR:
      return { ...state, pending: false, error: action.payload }

    case LOADING_ARCHIVED_TRIPS:
      return { ...state, pending: true }
    case LOADING_ARCHIVED_TRIPS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        trips: normalizeTrips(getArchivedTripsArray(action.payload))
      }
    case LOADING_ARCHIVED_TRIPS_ERROR:
      return { ...state, pending: false, error: action.payload }

    case GET_SINGLE_TRIP:
      return { ...state, activeTrip: action.payload }

    case CREATING_TRIP:
      return { ...state, pending: true }
    case CREATING_TRIP_SUCCESS:
      const newTrip = normalizeTrip(action.payload)
      return {
        ...state,
        pending: false,
        error: null,
        trips: { ...state.trips, ...newTrip }
      }
    case CREATING_TRIP_ERROR:
      return { ...state, pending: false, error: action.payload }
    default:
      return state

    case DELETING_TRIP:
      // Make activeTrip an empty string in case we happen to be deleting the activeTrip:
      return { ...state, pending: true, activeTrip: "" }
    case DELETING_TRIP_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        trips: getAllButDeleted(state, action.payload)
      }
    case DELETING_TRIP_ERROR:
      return { ...state, pending: false, error: action.payload }

    case TOGGLE_ARCHIVE_TRIP:
      return { ...state, pending: true }
    case TOGGLE_ARCHIVE_TRIP_SUCCESS:
      return { ...state, pending: false, error: null }
    case TOGGLE_ARCHIVE_TRIP_ERROR:
      return { ...state, pending: false, error: action.payload }

    // IMPLEMENT!
    case CREATING_WAYPOINT:
      return { ...state, pending: true }
  }
}
