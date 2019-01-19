import axios from "axios"
import { SERVER_URI } from "../../config"
import { toast } from "react-toastify"
import { normalizeErrorMsg } from "../../utils/selectors"
import {
  LOADING_WAYPOINTS,
  LOADING_WAYPOINTS_SUCCESS,
  LOADING_WAYPOINTS_ERROR,
  TOGGLE_WAYPOINT_SUCCESS,
  TOGGLE_WAYPOINT_ERROR
} from "./types"

const token = localStorage.getItem("token")
if (token) {
  // If token, set token as Authorization header on all axios requests:
  axios.defaults.headers.common["Authorization"] = token
}

export const getWaypointsByTrip = tripId => dispatch => {
  dispatch({ type: LOADING_WAYPOINTS })
  return axios
    .get(`${SERVER_URI}/trips/${tripId}`)
    .then(res => {
      dispatch({ type: LOADING_WAYPOINTS_SUCCESS, payload: res.data.waypoints })
    })
    .catch(err => {
      dispatch({ type: LOADING_WAYPOINTS_ERROR, payload: err })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const toggleWaypoint = (waypointId, isCompleted) => dispatch => {
  return axios
    .put(`${SERVER_URI}/waypoints/${waypointId}`, { complete: !isCompleted })
    .then(res => {
      dispatch({ type: TOGGLE_WAYPOINT_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: TOGGLE_WAYPOINT_ERROR, payload: err })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}
