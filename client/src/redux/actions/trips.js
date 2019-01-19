import axios from "axios"
import { push } from "connected-react-router"

import { SERVER_URI } from "../../config"
import { toast } from "react-toastify"
import { normalizeErrorMsg } from "../../utils/selectors"
import { convertMarkerToWaypoint } from "../../utils"
import {
  LOADING_TRIPS,
  LOADING_TRIPS_SUCCESS,
  LOADING_TRIPS_ERROR,
  GET_SINGLE_TRIP,
  CREATING_TRIP,
  CREATING_TRIP_SUCCESS,
  CREATING_TRIP_ERROR,
  DELETING_TRIP,
  DELETING_TRIP_SUCCESS,
  DELETING_TRIP_ERROR,
  TOGGLE_ARCHIVE_TRIP,
  TOGGLE_ARCHIVE_TRIP_SUCCESS,
  TOGGLE_ARCHIVE_TRIP_ERROR
} from "./types"

export const getTrips = user => dispatch => {
  const token = localStorage.getItem("token")
  if (token) {
    // If token, set token as Authorization header on all axios requests:
    axios.defaults.headers.common["Authorization"] = token
  }

  dispatch({ type: LOADING_TRIPS })
  return axios
    .get(`${SERVER_URI}/users/${user}/trips`)
    .then(res => {
      dispatch({ type: LOADING_TRIPS_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: LOADING_TRIPS_ERROR, payload: err })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const getSingleTrip = tripId => dispatch => {
  axios.get(`${SERVER_URI}/trips/${tripId}`).then(res => {
    dispatch({ type: GET_SINGLE_TRIP, payload: res.data })
  })
}

// export const editTrip = tripId => dispatch => {
//   dispatch({ type: GET_SINGLE_TRIP, payload: tripId })
//   dispatch(push("/app/trip/edit/" + tripId))
// }

export const createTrip = (trip, markers) => dispatch => {
  dispatch({ type: CREATING_TRIP })
  axios
    .post(`${SERVER_URI}/trips`, trip)
    .then(response => {
      let waypoints = markers.map(marker => ({
        ...convertMarkerToWaypoint(marker),
        tripId: response.data.id
      }))
      axios
        .post(`${SERVER_URI}/waypoints/batch`, waypoints)
        .then(() => {
          dispatch({ type: CREATING_TRIP_SUCCESS, payload: response.data })
          setTimeout(() =>
            dispatch(push(`/app/trip/${response.data.id}`), 2000)
          )
        })
        .catch(err => {
          console.log("Error saving waypoints to trip, err:", err)
        })
    })
    .catch(err => {
      dispatch({ type: CREATING_TRIP_ERROR, payload: err })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const deleteTrip = tripId => dispatch => {
  dispatch({ type: DELETING_TRIP })
  axios
    .delete(`${SERVER_URI}/trips/${tripId}`)
    .then(res => {
      dispatch({ type: DELETING_TRIP_SUCCESS, payload: res.data.id })
    })
    .catch(err => {
      dispatch({ type: DELETING_TRIP_ERROR, payload: err })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const toggleArchive = (tripId, archived, user) => dispatch => {
  dispatch({ type: TOGGLE_ARCHIVE_TRIP })
  axios
    .put(`${SERVER_URI}/trips/${tripId}`, { isArchived: !archived })
    .then(() => {
      dispatch({ type: TOGGLE_ARCHIVE_TRIP_SUCCESS })
    })
    .then(() => {
      dispatch(getTrips(user))
    })
    .catch(err => {
      dispatch({ type: TOGGLE_ARCHIVE_TRIP_ERROR, payload: err })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}
