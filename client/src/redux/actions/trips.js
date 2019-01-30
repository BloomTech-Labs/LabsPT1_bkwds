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
  TOGGLE_ARCHIVE_TRIP_ERROR,
  REPEAT_TRIP,
  REPEAT_TRIP_SUCCESS,
  REPEAT_TRIP_ERROR,
  UPLOADING_TRIP_PIC,
  UPLOADING_TRIP_PIC_ERROR,
  EDIT_TRIP,
  EDIT_TRIP_ERROR,
  EDIT_TRIP_SUCCESS,
  START_TRIP,
  START_TRIP_SUCCESS,
  START_TRIP_ERROR,
  ADD_TRIP_TIME_LIMIT,
  ADD_TRIP_TIME_LIMIT_SUCCESS,
  ADD_TRIP_TIME_LIMIT_ERROR,
  TOGGLE_WAYPOINT_SUCCESS,
  TOGGLE_WAYPOINT_ERROR,
  REMOVE_ACTIVE_TRIP
} from "./types"

export const getTrips = userId => dispatch => {
  const token = localStorage.getItem("token")
  if (token) {
    // If token, set token as Authorization header on all axios requests:
    axios.defaults.headers.common["Authorization"] = token
  }

  dispatch({ type: LOADING_TRIPS })
  return axios
    .get(`${SERVER_URI}/users/${userId}/trips`)
    .then(res => {
      dispatch({ type: LOADING_TRIPS_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: LOADING_TRIPS_ERROR, payload: normalizeErrorMsg(err) })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}
export const removeActiveTrip = () => {
  return { type: REMOVE_ACTIVE_TRIP }
}
export const getSingleTrip = tripId => dispatch => {
  axios.get(`${SERVER_URI}/trips/${tripId}`).then(res => {
    dispatch({ type: GET_SINGLE_TRIP, payload: res.data })
  })
}

export const editTrip = trip => dispatch => {
  dispatch({ type: EDIT_TRIP })
  let calls = []
  let newWaypoints = trip.waypoints.filter(waypoint => {
    return waypoint.id === undefined
  })

  let updatedWaypoints = trip.waypoints.filter(waypoint => {
    return waypoint.id !== undefined
  })

  if (newWaypoints.length > 0) {
    calls.push(axios.post(`${SERVER_URI}/waypoints/batch`, newWaypoints))
  }
  if (updatedWaypoints.length > 0) {
    updatedWaypoints.forEach(waypoint => {
      calls.push(
        axios.put(`${SERVER_URI}/waypoints/${waypoint.id}`, {
          lat: waypoint.lat,
          lon: waypoint.lon,
          name: waypoint.name,
          order: waypoint.order
        })
      )
    })
  }
  axios
    .all(calls)
    .then(() => {
      axios
        .put(`${SERVER_URI}/trips/${trip.id}`, { name: trip.name })
        .then(res => {
          dispatch({ type: EDIT_TRIP_SUCCESS, payload: res.data })
        })
    })
    .catch(err => {
      dispatch({ type: EDIT_TRIP_ERROR, payload: normalizeErrorMsg(err) })
    })
}

export const startTrip = trip => dispatch => {
  dispatch({ type: START_TRIP })
  axios
    .put(`${SERVER_URI}/trips/${trip.id}`, { inProgress: true })
    .then(res => {
      dispatch({ type: START_TRIP_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: START_TRIP_ERROR, payload: normalizeErrorMsg(err) })
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
      dispatch({ type: CREATING_TRIP_ERROR, payload: normalizeErrorMsg(err) })
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
      dispatch({ type: DELETING_TRIP_ERROR, payload: normalizeErrorMsg(err) })
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
      dispatch({
        type: TOGGLE_ARCHIVE_TRIP_ERROR,
        payload: normalizeErrorMsg(err)
      })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const repeatTrip = trip => async dispatch => {
  dispatch({ type: REPEAT_TRIP })

  try {
    // duplicate original trip with empty waypoints
    const repeatedTripReponse = await axios.post(`${SERVER_URI}/trips/repeat`, {
      ...trip
    })

    const repeatedTrip = repeatedTripReponse.data
    // calculate different time between two trips
    const diffTime = Date.parse(repeatedTrip.start) - Date.parse(trip.start)
    // get waypoints details of original trip
    const oldWaypointsResponse = await axios.get(
      `${SERVER_URI}/trips/${trip.id}`
    )
    const newWaypoints = oldWaypointsResponse.data.waypoints
    // copy waypoints from original trip
    newWaypoints.forEach(waypoint => {
      console.log(waypoint)
      // reset each waypoint completion
      waypoint.complete = false
      // add up different time to each waypoint end date
      waypoint.end = Date.parse(waypoint.end) + diffTime
      // remove waypoint id, db will generate new waypoint id
      delete waypoint.id
      // replace tripId with repeat trip id
      waypoint.tripId = repeatedTrip.id
    })

    // paste waypoints to repeated trip
    await axios.post(`${SERVER_URI}/waypoints/batch`, newWaypoints)

    dispatch({ type: REPEAT_TRIP_SUCCESS, payload: repeatedTrip })
    dispatch(push(`/app/trip/${repeatedTrip.id}`))
  } catch (err) {
    dispatch({ type: REPEAT_TRIP_ERROR, payload: normalizeErrorMsg(err) })
    toast.error(normalizeErrorMsg(err), {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
}

export const addTripSafetyTimeLimit = (trip, hours) => dispatch => {
  dispatch({ type: ADD_TRIP_TIME_LIMIT })

  axios
    .put(`${SERVER_URI}/trips/${trip.id}`, { timeLimit: hours })
    .then(response => {
      dispatch({ type: ADD_TRIP_TIME_LIMIT_SUCCESS, payload: response.data })
      // TODO CONNECT TO SMS ENDPOINT
      axios
        .post(`${SERVER_URI}/send_sms`, {
          userId: trip.userId,
          tripId: trip.id
        })
        .then(() => {
          console.log("Safety SMS Alert succesfully queued")
        })
        .catch(() => {
          toast.error("Safety SMS Alert failed to queue", {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        })
    })
    .catch(err => {
      dispatch({ type: ADD_TRIP_TIME_LIMIT_ERROR, payload: err.toString() })
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

export const uploadPics = (tripId, image) => dispatch => {
  console.log(image, "RES Action")
  dispatch({ type: UPLOADING_TRIP_PIC })
  axios
    .put(`${SERVER_URI}/trips/upload/${tripId}`, { image })
    .then(res => {
      console.log(res, "RESTWO")
      // dispatch({ type: UPLOADING_TRIP_PIC_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: UPLOADING_TRIP_PIC_ERROR, payload: err })
    })
}
