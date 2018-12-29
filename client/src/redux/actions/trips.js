import axios from "axios"
import { push } from "connected-react-router"

import { SERVER_URI } from "../../config"
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
} from "./types"

export const getTrips = () => dispatch => {
  dispatch({ type: LOADING_TRIPS })
  return axios
    .get(`${SERVER_URI}/trips`)
    .then(res => {
      dispatch({ type: LOADING_TRIPS_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: LOADING_TRIPS_ERROR, payload: err })
      //errorHandler(err)
      console.error("GET TRIPS ERROR!", err)
    })
}

export const getSingleTrip = tripId => dispatch => {
  dispatch({ type: GET_SINGLE_TRIP, payload: tripId })
}

export const createTrip = trip => dispatch => {
  dispatch({ type: CREATING_TRIP })
  axios
    .post(`${SERVER_URI}/trips`, { ...trip })
    .then(res => {
      dispatch({ type: CREATING_TRIP_SUCCESS, payload: res.data })
      dispatch(push("/app/trips"))
    })
    .catch(err => {
      dispatch({ type: CREATING_TRIP_ERROR, payload: err })
      //errorHandler(err)
      console.error("CREATE TRIP ERROR!", err)
    })
}

export const deleteTrip = tripId => dispatch => {
  dispatch({ type: DELETING_TRIP })
  axios
    .delete(`${SERVER_URI}/trips/${tripId}`)
    .then(res => {
      dispatch({ type: DELETING_TRIP_SUCCESS, payload: res.data._id })
    })
    .catch(err => {
      dispatch({ type: DELETING_TRIP_ERROR, payload: err })
      //errorHandler(err)
      console.error("DELETE TRIP ERROR!", err)
    })
}

export const archiveTrip = tripId => dispatch => {
  dispatch({ type: ARCHIVING_TRIP })
}

export const saveWaypoint = waypoint => dispatch => {
  dispatch({ type: CREATING_WAYPOINT })
  alert("implement save waypoint!")
}
