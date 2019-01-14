import axios from "axios"

import { SERVER_URI } from "../../config"
import {
  INI_UPDATE_SETTINGS,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAILURE,
  UPDATE_USER_IN_STORE
} from "./types"

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
    })
    .catch(err => {
      dispatch({ type: UPDATE_SETTINGS_FAILURE, payload: err })
    })
}

export const updatePassword = () => {
  return null
}
