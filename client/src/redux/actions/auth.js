import axios from "axios"
import { push } from "connected-react-router"
import {
  AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  // LOGOUT_FAILURE,
  PASSWORD_MATCH_ERROR,
  PASSWORD_MATCH_SUCCESS,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE
} from "./types"

const SERVER_URI = "https://backwoods-tracker.herokuapp.com/api/"

export const login = ({ username, password }) => (dispatch, getState) => {
  dispatch({ type: AUTH_LOADING })
  return axios
    .post(`${SERVER_URI}/login`, { username, password })
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token })

      localStorage.setItem("token", JSON.stringify(res.data.token))

      dispatch(push("/login_success"))
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, payload: err })
      // add call to as yet undefined errorHandler helper here:
      //errorHandler(err)
    })
}

export const register = ({
  email,
  username,
  pass,
  confirmPass
}) => dispatch => {
  if (pass !== confirmPass) {
    dispatch({ type: PASSWORD_MATCH_ERROR, payload: "Passwords don't match" })
    return
  }

  dispatch({ type: PASSWORD_MATCH_SUCCESS })
  dispatch({ type: AUTH_LOADING })

  return axios
    .post(`${SERVER_URI}/register`, { email, username, pass })
    .then(res => {
      // DO WE NEED THIS CHECK?
      // if (res.status === 201) {
      dispatch({ type: REGISTRATION_SUCCESS })
      dispatch(push("/logged-in"))
    })
    .catch(err => {
      dispatch({ type: REGISTRATION_FAILURE, payload: err })
      // add call to as yet undefined errorHandler helper here:
      //errorHandler(err)
    })
}

export const logout = () => dispatch => {
  localStorage.removeItem("token")
  dispatch({ type: LOGOUT_SUCCESS })
}
