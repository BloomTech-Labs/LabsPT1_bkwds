import axios from "axios"
import { push } from "connected-react-router"
import decodeJwt from "jwt-decode"
import { toast } from "react-toastify"
import { normalizeErrorMsg } from "../../utils/selectors"

import { SERVER_URI } from "../../config"
import {
  AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  ADD_TOKEN_TO_STATE,
  QUERYING_USER_BY_TOKEN,
  QUERYING_USER_BY_TOKEN_SUCCESS,
  QUERYING_USER_BY_TOKEN_ERROR,
  UPDATE_USER_IN_STORE
} from "./types"

import { authRef, provider } from "../../config/firebase"

export const login = ({ email, password }) => dispatch => {
  dispatch({ type: AUTH_LOADING })
  axios
    .post(`${SERVER_URI}/login`, { email, password })
    .then(res => {
      const { token, user } = res.data
      dispatch({ type: LOGIN_SUCCESS, payload: user })
      localStorage.setItem("token", token)
      dispatch(addTokenToState())
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, payload: normalizeErrorMsg(err) })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const register = ({ email, password }) => dispatch => {
  dispatch({ type: AUTH_LOADING })

  axios
    .post(`${SERVER_URI}/register`, { email, password })
    .then(res => {
      const { token, user } = res.data
      dispatch({ type: REGISTRATION_SUCCESS, payload: user })
      localStorage.setItem("token", token)
      dispatch(addTokenToState())
    })
    .catch(err => {
      dispatch({ type: REGISTRATION_FAILURE, payload: normalizeErrorMsg(err) })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const updateUserInStore = ({
  customerId,
  subDate,
  subscribeId,
  subscribed
}) => dispatch => {
  const updates = { customerId, subDate, subscribeId, subscribed }
  dispatch({ type: UPDATE_USER_IN_STORE, payload: updates })
}

export const logout = () => dispatch => {
  // log out backwoods
  localStorage.removeItem("token")
  // unlink third-party account
  authRef
    .signOut()
    .then(() => {
      dispatch({ type: LOGOUT_SUCCESS })
      toast.success("Log out successful", {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
    .catch(err => {
      console.log(err)
      toast.error("Error when unlink your account", {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
  dispatch(push("/login"))
}

export const addTokenToState = () => dispatch => {
  let token
  try {
    token = localStorage.getItem("token")
  } catch (e) {
    console.log("ADD TOKEN TO STATE ERROR:", e)
  }
  // If no token, bail out:
  if (!token) return
  dispatch({ type: ADD_TOKEN_TO_STATE, payload: token })
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
    .get(`${SERVER_URI}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: QUERYING_USER_BY_TOKEN_SUCCESS, payload: res.data })
      dispatch(push("/app/dashboard"))
    })
    .catch(err => {
      dispatch({
        type: QUERYING_USER_BY_TOKEN_ERROR,
        payload: normalizeErrorMsg(err)
      })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const registerWithOauth = () => dispatch => {
  // first sign in third party
  authRef
    .signInWithPopup(provider)
    .then(({ user }) => {
      const oauthUser = {
        email: user.email,
        password: user.uid
      }

      // register backwoods account
      dispatch({ type: AUTH_LOADING })
      axios
        .post(`${SERVER_URI}/register`, oauthUser)
        .then(res => {
          const { token, user } = res.data
          dispatch({
            type: REGISTRATION_SUCCESS,
            payload: user
          })
          localStorage.setItem("token", token)
          dispatch(addTokenToState())
        })
        .catch(err => {
          dispatch({
            type: REGISTRATION_FAILURE,
            payload: normalizeErrorMsg(err)
          })
          toast.error(normalizeErrorMsg(err), {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        })
    })
    .catch(error => {
      dispatch({
        type: REGISTRATION_FAILURE
      })
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const loginWithOauth = () => dispatch => {
  // sign in third party
  authRef
    .signInWithPopup(provider)
    .then(({ user }) => {
      const oauthUser = {
        email: user.email,
        password: user.uid
      }

      // sign in backwoods app
      dispatch({ type: AUTH_LOADING })
      axios
        .post(`${SERVER_URI}/login`, {
          email: oauthUser.email,
          password: oauthUser.password
        })
        .then(res => {
          const { token, user } = res.data
          dispatch({ type: LOGIN_SUCCESS, payload: user })
          localStorage.setItem("token", token)
          dispatch(addTokenToState())
          dispatch(push("/app/dashboard"))
        })
        .catch(err => {
          dispatch({ type: LOGIN_FAILURE, payload: normalizeErrorMsg(err) })
          toast.error("Cannot find your account", {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        })
    })
    .catch(error => {
      dispatch({
        type: REGISTRATION_FAILURE
      })
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}
