import {
  LOADING_WAYPOINTS,
  LOADING_WAYPOINTS_SUCCESS,
  LOADING_WAYPOINTS_ERROR,
  TOGGLE_WAYPOINT_SUCCESS,
  TOGGLE_WAYPOINT_ERROR
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

    case TOGGLE_WAYPOINT_SUCCESS:
      const waypointIndex = state.list.findIndex(
        waypoint => waypoint.id === action.payload.id
      )
      return {
        ...state,
        pending: false,
        list: [
          ...state.list.slice(0, waypointIndex),
          action.payload,
          ...state.list.slice(waypointIndex + 1)
        ]
      }
    case TOGGLE_WAYPOINT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload
      }

    default:
      return { ...state }
  }
}
