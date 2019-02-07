import axios from "axios"

import { SERVER_URI } from "../../config"
import {
  INI_UPDATE_SETTINGS,
  CLOSE_MODAL,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAILURE,
  UPDATE_USER_IN_STORE
} from "./types"

import { normalizeErrorMsg } from "../../utils/selectors"
import { toast } from "react-toastify"

const token = localStorage.getItem("token")
if (token) {
  axios.defaults.headers.common["Authorization"] = token
}

export const updateUserWithMsg = (userId, values, msg) => dispatch => {
  if (!axios.defaults.headers.common["Authorization"]) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    )
  }
  dispatch({ type: INI_UPDATE_SETTINGS })
  axios
    .put(`${SERVER_URI}/users/${userId}`, { ...values })
    .then(res => {
      const user = res.data
      dispatch({ type: UPDATE_SETTINGS_SUCCESS })
      dispatch({ type: UPDATE_USER_IN_STORE, payload: user })
      toast.success(msg, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
      dispatch({ type: CLOSE_MODAL })
    })
    .catch(err => {
      dispatch({
        type: UPDATE_SETTINGS_FAILURE,
        payload: normalizeErrorMsg(err)
      })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const updateEmail = (userId, email) => dispatch => {
  dispatch({ type: INI_UPDATE_SETTINGS })

  axios
    .put(`${SERVER_URI}/users/${userId}`, { email })
    .then(res => {
      const user = res.data
      dispatch({ type: UPDATE_SETTINGS_SUCCESS })
      dispatch({ type: UPDATE_USER_IN_STORE, payload: user })
      toast.success("Your new email has been updated.", {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
    .catch(err => {
      dispatch({
        type: UPDATE_SETTINGS_FAILURE,
        payload: normalizeErrorMsg(err)
      })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const updatePassword = (email, oldPassword, newPassword) => dispatch => {
  if (oldPassword === newPassword) {
    toast.error("Your old and new password are the same.", {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }

  dispatch({ type: INI_UPDATE_SETTINGS })

  axios
    .post(`${SERVER_URI}/changePassword`, {
      email,
      oldPassword,
      newPassword
    })
    .then(() => {
      dispatch({ type: UPDATE_SETTINGS_SUCCESS })
      toast.success("Your new password has been updated.", {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
    .catch(err => {
      dispatch({
        type: UPDATE_SETTINGS_FAILURE,
        payload: normalizeErrorMsg(err)
      })
      toast.error(normalizeErrorMsg(err), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}
