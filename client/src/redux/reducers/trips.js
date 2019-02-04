import {
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
  DELETING_TRIP_ERROR,
  TOGGLE_ARCHIVE_TRIP,
  TOGGLE_ARCHIVE_TRIP_SUCCESS,
  TOGGLE_ARCHIVE_TRIP_ERROR,
  REPEAT_TRIP,
  REPEAT_TRIP_SUCCESS,
  REPEAT_TRIP_ERROR,
  UPLOADING_TRIP_PIC,
  UPLOADING_TRIP_PIC_SUCCESS,
  UPLOADING_TRIP_PIC_ERROR,
  TOGGLE_PUBLIC_TRIP,
  TOGGLE_PUBLIC_TRIP_SUCCESS,
  TOGGLE_PUBLIC_TRIP_ERROR,
  EDIT_TRIP,
  EDIT_TRIP_SUCCESS,
  EDIT_TRIP_ERROR,
  START_TRIP_SUCCESS,
  START_TRIP,
  START_TRIP_ERROR,
  ADD_TRIP_TIME_LIMIT,
  ADD_TRIP_TIME_LIMIT_SUCCESS,
  ADD_TRIP_TIME_LIMIT_ERROR,
  TOGGLE_WAYPOINT_SUCCESS,
  TOGGLE_WAYPOINT_ERROR,
  REMOVE_ACTIVE_TRIP
} from "../actions/types"

import {
  normalizeTrip,
  normalizeTrips,
  getAllButDeleted
} from "../../utils/selectors"

const defaultState = {
  pending: false,
  error: null,
  trips: {},
  activeTrip: null,
  tripPics: []
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
      // Make activeTrip an empty object in case we happen to be deleting the activeTrip:
      return { ...state, pending: true, activeTrip: {} }
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

    case EDIT_TRIP:
      return { ...state, pending: true }
    case EDIT_TRIP_SUCCESS:
      return { ...state, pending: false }
    case EDIT_TRIP_ERROR:
      return { ...state, pending: false, error: action.payload }

    case START_TRIP:
      return { ...state, pending: true }
    case START_TRIP_SUCCESS:
      return { ...state, pending: false, activeTrip: action.payload }
    case START_TRIP_ERROR:
      return { ...state, pending: false, error: action.payload }

    case REMOVE_ACTIVE_TRIP:
      return { ...state, activeTrip: null }

    case REPEAT_TRIP:
      return {
        ...state,
        pending: true
      }

    case REPEAT_TRIP_SUCCESS:
      return {
        ...state,
        pending: false,
        trips: { ...state.trips, [action.payload.id]: action.payload }
      }

    case REPEAT_TRIP_ERROR:
      return { ...state, pending: false, error: action.payload }
    // IMPLEMENT!
    case CREATING_WAYPOINT:
      return { ...state, pending: true }

    case UPLOADING_TRIP_PIC:
      return { ...state, pending: true }
    case UPLOADING_TRIP_PIC_SUCCESS:
      return {
        ...state,
        pending: false,
        activeTrip: { ...state.activeTrip, tripPics: action.payload }
      }
    case UPLOADING_TRIP_PIC_ERROR:
      return { ...state, pending: false, error: action.payload }

    case ADD_TRIP_TIME_LIMIT:
      return {
        ...state,
        pending: true
      }
    case ADD_TRIP_TIME_LIMIT_SUCCESS:
      return {
        ...state,
        pending: false,
        trips: { ...state.trips, [action.payload.id]: action.payload }
      }
    case ADD_TRIP_TIME_LIMIT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload
      }
    case TOGGLE_WAYPOINT_SUCCESS:
      const waypointIndex = state.activeTrip.waypoints.findIndex(
        waypoint => waypoint.id === action.payload.id
      )
      return {
        ...state,
        pending: false,
        activeTrip: {
          ...state.activeTrip,
          waypoints: [
            ...state.activeTrip.waypoints.slice(0, waypointIndex),
            action.payload,
            ...state.activeTrip.waypoints.slice(waypointIndex + 1)
          ]
        }
      }
    case TOGGLE_WAYPOINT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload
      }
    case TOGGLE_PUBLIC_TRIP:
      return { ...state, pending: true }
    case TOGGLE_PUBLIC_TRIP_SUCCESS:
      console.log(action.payload, "PAY:PD")
      return {
        ...state,
        pending: false,
        trips: { ...state.trips, [action.payload.id]: action.payload }
      }
    case TOGGLE_PUBLIC_TRIP_ERROR:
      return { ...state, pending: false, error: action.payload }
  }
}
