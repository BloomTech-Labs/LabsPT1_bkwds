import axios from "axios"
import { push } from "connected-react-router"

import { SERVER_URI } from "../../config"
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
  DELETING_TRIP,
  DELETING_TRIP_SUCCESS,
  DELETING_TRIP_ERROR,
  TOGGLE_ARCHIVE_TRIP,
  TOGGLE_ARCHIVE_TRIP_SUCCESS,
  TOGGLE_ARCHIVE_TRIP_ERROR
} from "./types"

const token = localStorage.getItem("jwt")

// Set token as Authorization header on all requests:
axios.defaults.headers.common["Authorization"] = token

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

export const getArchivedTrips = () => dispatch => {
  dispatch({ type: LOADING_ARCHIVED_TRIPS })
  return axios
    .get(`${SERVER_URI}/trips`)
    .then(res => {
      dispatch({ type: LOADING_ARCHIVED_TRIPS_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: LOADING_ARCHIVED_TRIPS_ERROR, payload: err })
      //errorHandler(err)
      console.error("GET ARCHIVED TRIPS ERROR!", err)
    })
}

export const getSingleTrip = tripId => dispatch => {
  dispatch({ type: GET_SINGLE_TRIP, payload: tripId })
  dispatch(push("/app/trip/get/" + tripId))
}

export const editTrip = tripId => dispatch => {
  dispatch({ type: GET_SINGLE_TRIP, payload: tripId })
  dispatch(push("/app/trip/edit/" + tripId))
}

export const createTrip = trip => dispatch => {
  dispatch({ type: CREATING_TRIP })
  axios
    .post(`${SERVER_URI}/trips`, { ...trip })
    .then(res => {
      dispatch({ type: CREATING_TRIP_SUCCESS, payload: res.data })
      dispatch(push("/app/trips/"))
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
      dispatch({ type: DELETING_TRIP_SUCCESS, payload: res.data.id })
    })
    .catch(err => {
      dispatch({ type: DELETING_TRIP_ERROR, payload: err })
      //errorHandler(err)
      console.error("DELETE TRIP ERROR!", err)
    })
}

export const toggleArchive = (tripId, archiveTrip) => dispatch => {
  dispatch({ type: TOGGLE_ARCHIVE_TRIP })
  axios
    .put(`${SERVER_URI}/trips/${tripId}`, { isArchived: archiveTrip })
    .then(() => {
      dispatch({ type: TOGGLE_ARCHIVE_TRIP_SUCCESS })
    })
    .then(() => {
      archiveTrip ? dispatch(getTrips()) : dispatch(getArchivedTrips())
    })
    .catch(err => {
      dispatch({ type: TOGGLE_ARCHIVE_TRIP_ERROR, payload: err })
      //errorHandler(err)
      console.error("ARCHIVING TRIP ERROR!", err)
    })
}
