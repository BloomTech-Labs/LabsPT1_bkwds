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
  GET_TOKEN_FROM_LOCAL_STORAGE,
  QUERYING_USER_BY_TOKEN,
  QUERYING_USER_BY_TOKEN_SUCCESS,
  QUERYING_USER_BY_TOKEN_ERROR,
  UPDATE_USER_IN_STORE
} from "./types"

import { authRef, provider } from "../../config/firebase"

export const login = ({ username, password }) => dispatch => {
  dispatch({ type: AUTH_LOADING })
  axios
    .post(`${SERVER_URI}/login`, { username, password })
    .then(res => {
      const { token, user } = res.data
      dispatch({ type: LOGIN_SUCCESS, payload: user })
      localStorage.setItem("token", token)
      // dispatch({ type: GET_TOKEN_FROM_LOCAL_STORAGE, payload: token })
      dispatch(addTokenToState())

      dispatch(push("/app/trips"))
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILURE, payload: err })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const register = ({ email, username, password }) => dispatch => {
  dispatch({ type: AUTH_LOADING })

  axios
    .post(`${SERVER_URI}/register`, { email, username, password })
    .then(res => {
      const { token } = res.data
      dispatch({ type: REGISTRATION_SUCCESS, payload: { username, email } })
      localStorage.setItem("token", token)
      // dispatch({ type: GET_TOKEN_FROM_LOCAL_STORAGE, payload: token })
      dispatch(addTokenToState())
      dispatch(checkDbForUser(token))
    })
    .catch(err => {
      dispatch({ type: REGISTRATION_FAILURE, payload: err })
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
      toast.error("Error when unlink your account", {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
  dispatch(push("/"))
}

export const addTokenToState = () => dispatch => {
  let token
  try {
    token = localStorage.getItem("token")
  } catch (e) {
    console.error("ADD TOKEN TO STATE ERROR:", e)
  }
  // If no token, bail out:
  if (!token) return
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
    .get(`${SERVER_URI}/user_from_token/${id}`)
    .then(res => {
      dispatch({ type: QUERYING_USER_BY_TOKEN_SUCCESS, payload: res.data })
      dispatch(push("/app"))
    })
    .catch(err => {
      dispatch({ type: QUERYING_USER_BY_TOKEN_ERROR, payload: err })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const registerWithOauth = oauthName => dispatch => {
  // first sign in third party
  authRef
    .signInWithPopup(provider)
    .then(({ user }) => {
      const oauthUser = {
        email: user.email,
        username: user.email,
        password: user.uid
      }

      // register backwoods account
      dispatch({ type: AUTH_LOADING })
      axios
        .post(`${SERVER_URI}/register`, oauthUser)
        .then(res => {
          const { token } = res.data
          dispatch({
            type: REGISTRATION_SUCCESS,
            payload: { username: oauthUser.username, email: oauthUser.email }
          })
          localStorage.setItem("token", token)
          dispatch(addTokenToState())
          dispatch(checkDbForUser(token))
        })
        .catch(err => {
          dispatch({ type: REGISTRATION_FAILURE, payload: err })
          toast.error("You already registered. Please log in instead.", {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        })
    })
    .catch(error => {
      console.log(error)
      dispatch({
        type: REGISTRATION_FAILURE
      })
      toast.error(`Cannot register with your ${oauthName} account`, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const loginWithOauth = oauthName => dispatch => {
  // sign in third party
  authRef
    .signInWithPopup(provider)
    .then(({ user }) => {
      const oauthUser = {
        email: user.email,
        username: user.email,
        password: user.uid
      }

      // sign in backwoods app
      dispatch({ type: AUTH_LOADING })
      axios
        .post(`${SERVER_URI}/login`, {
          username: oauthUser.username,
          password: oauthUser.password
        })
        .then(res => {
          const { token, user } = res.data
          dispatch({ type: LOGIN_SUCCESS, payload: user })
          localStorage.setItem("token", token)
          dispatch(addTokenToState())

          dispatch(push("/app/trips"))
        })
        .catch(err => {
          dispatch({ type: LOGIN_FAILURE, payload: err })
          toast.error("Cannot find your account", {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        })
    })
    .catch(error => {
      console.log(error)
      dispatch({
        type: REGISTRATION_FAILURE
      })
      toast.error(`Cannot sign in with your ${oauthName} account`, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}
