import axios from "axios"
import { push } from "connected-react-router"
import decodeJwt from "jwt-decode"

import { SERVER_URI } from "../../config"
import {
  AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  GET_TOKEN_FROM_LOCAL_STORAGE,
  QUERYING_USER_BY_TOKEN,
  QUERYING_USER_BY_TOKEN_SUCCESS,
  QUERYING_USER_BY_TOKEN_ERROR
} from "./types"

export const login = ({ username, password }) => dispatch => {
  dispatch({ type: AUTH_LOADING })
  return axios
    .post(`${SERVER_URI}/login`, { username, password })
    .then(res => {
      console.log("RESPONSE:", res)
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.user })

      localStorage.setItem("jwt", JSON.stringify(res.data.token))

      dispatch(push("/app"))
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, payload: err })
      //errorHandler(err)
    })
}

export const register = ({ email, username, password }) => dispatch => {
  dispatch({ type: AUTH_LOADING })

  return axios
    .post(`${SERVER_URI}/register`, { email, username, password })
    .then(() => {
      dispatch({ type: REGISTRATION_SUCCESS })
      dispatch(push("/login"))
    })
    .catch(err => {
      dispatch({ type: REGISTRATION_FAILURE, payload: err })
      //errorHandler(err)
    })
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_SUCCESS })
  localStorage.removeItem("jwt")
  dispatch(push("/"))
}

export const addTokenToState = () => dispatch => {
  let token
  try {
    token = localStorage.getItem("jwt")
  } catch (e) {
    console.error(e)
  }
  // If no token, bail out:
  if (!token) return
  console.log("TOKEN FOUND!", token)
  dispatch({ type: GET_TOKEN_FROM_LOCAL_STORAGE, payload: token })
  // Use token to check DB for user:
  dispatch(checkDbForUser(token))
}

export const checkDbForUser = token => dispatch => {
  dispatch({ type: QUERYING_USER_BY_TOKEN })
  const { id } = decodeJwt(token)
  if (!id)
    return dispatch({
      type: QUERYING_USER_BY_TOKEN_ERROR,
      payload: `Token invalid: ${token}`
    })

  axios
    .post(`${SERVER_URI}/user_from_token`, { id })
    .then(res => {
      console.log("RESPONSE! res.data:", res.data)
      dispatch({ type: QUERYING_USER_BY_TOKEN_SUCCESS, payload: res.data })
      dispatch(push("/app"))
    })
    .catch(err => {
      dispatch({ type: QUERYING_USER_BY_TOKEN_ERROR, payload: err })
      // errorHandler(err)
      console.error("GET USER WITH TOKEN ERROR:", err)
    })
}
