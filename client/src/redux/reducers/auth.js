import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_TOKEN_FROM_LOCAL_STORAGE,
  QUERYING_USER_BY_TOKEN,
  QUERYING_USER_BY_TOKEN_SUCCESS,
  QUERYING_USER_BY_TOKEN_ERROR
} from "../actions/types"

import { normalizeUser } from "../../utils/selectors"

const defaultState = {
  user: {},
  pending: false,
  isLoggedIn: false,
  checkedForToken: false,
  error: null,
  token: ""
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: normalizeUser(action.payload)
      }

    case LOGOUT_SUCCESS:
      return { ...state, user: {}, isLoggedIn: false }

    case GET_TOKEN_FROM_LOCAL_STORAGE:
      return { ...state, token: action.payload }
    case QUERYING_USER_BY_TOKEN:
      return { ...state, pending: true, checkedForToken: true }
    case QUERYING_USER_BY_TOKEN_SUCCESS:
      return {
        ...state,
        pending: false,
        isLoggedIn: true,
        user: normalizeUser(action.payload)
      }
    case QUERYING_USER_BY_TOKEN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload
      }

    default:
      return state
  }
}
