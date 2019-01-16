import axios from "axios"

import { SERVER_URI } from "../../config"
import {
  INI_UPDATE_SETTINGS,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAILURE,
  UPDATE_USER_IN_STORE
} from "./types"

import { toast } from "react-toastify"

const token = localStorage.getItem("token")
if (token) {
  axios.defaults.headers.common["Authorization"] = token
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
      dispatch({ type: UPDATE_SETTINGS_FAILURE, payload: err })
      toast.error(err.toString(), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}

export const updatePassword = (
  username,
  oldPassword,
  newPassword
) => dispatch => {
  if (oldPassword === newPassword) {
    toast.error("Your old and new password are the same.", {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }

  dispatch({ type: INI_UPDATE_SETTINGS })

  axios
    .post(`${SERVER_URI}/changePassword`, {
      username,
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
      dispatch({ type: UPDATE_SETTINGS_FAILURE, payload: err })
      toast.error(err.toString(), {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
}
