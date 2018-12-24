import {
  LOADING_TRIPS,
  LOADING_TRIPS_SUCCESS,
  LOADING_TRIPS_ERROR,
  CREATING_TRIP,
  CREATING_TRIP_SUCCESS,
  CREATING_TRIP_ERROR
} from "../actions/types"

const defaultState = {
  loading: false,
  error: null,
  trips: []
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
        trips: action.payload
      }
    case LOADING_TRIPS_ERROR:
      return { ...state, loading: false, error: action.payload }
    case CREATING_TRIP:
      return { ...state, loading: true }
    case CREATING_TRIP_SUCCESS:
      return {
        ...state,
        loading: false,
        trips: [...state.trips, action.payload]
      }
    case CREATING_TRIP_ERROR:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
