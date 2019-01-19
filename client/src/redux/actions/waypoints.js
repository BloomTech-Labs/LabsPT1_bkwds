import axios from "axios"
import { SERVER_URI } from "../../config"
import { toast } from "react-toastify"
import { normalizeErrorMsg } from "../../utils/selectors"
import {
  LOADING_WAYPOINTS,
  LOADING_WAYPOINTS_SUCCESS,
  LOADING_WAYPOINTS_ERROR
} from "./types"

export const getWaypointsByTrip = tripId => dispatch => {
  const token = localStorage.getItem("token")
  if (token) {
    // If token, set token as Authorization header on all axios requests:
    axios.defaults.headers.common["Authorization"] = token
  }

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
