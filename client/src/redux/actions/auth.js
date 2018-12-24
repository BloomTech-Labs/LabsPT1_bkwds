import axios from "axios"
import { push } from "connected-react-router"
import { SERVER_URI } from "../../config"
import {
  AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE
} from "./types"

export const login = ({ username, password }) => dispatch => {
  dispatch({ type: AUTH_LOADING })
  return axios
    .get(`${SERVER_URI}/login`, { username, password })
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

export const register = ({ email, username, password }) => dispatch => {
  dispatch({ type: AUTH_LOADING })

  return axios
    .post(`${SERVER_URI}/register`, { email, username, password })
    .then(() => {
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
  dispatch(push("/"))
}
