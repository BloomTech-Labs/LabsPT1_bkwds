import {
  LOADING_WAYPOINTS,
  LOADING_WAYPOINTS_SUCCESS,
  LOADING_WAYPOINTS_ERROR
} from "../actions/types"

const defaultState = {
  pending: false,
  error: null,
  list: null
}

export const waypointsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOADING_WAYPOINTS:
      return { ...state, pending: true }

    case LOADING_WAYPOINTS_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        list: action.payload
      }

    case LOADING_WAYPOINTS_ERROR:
      return { ...state, pending: false, error: action.payload }

    default:
      return { ...state }
  }
}
