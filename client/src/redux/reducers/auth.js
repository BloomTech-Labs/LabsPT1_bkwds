import {
  AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  GET_TOKEN_FROM_LOCAL_STORAGE,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  QUERYING_USER_BY_TOKEN,
  QUERYING_USER_BY_TOKEN_SUCCESS,
  QUERYING_USER_BY_TOKEN_ERROR,
  UPDATE_USER_IN_STORE
} from "../actions/types"

import { normalizeUser, normalizeErrorMsg } from "../../utils/selectors"

const defaultUser = {
  id: null,
  username: "",
  email: "",
  subscribed: false,
  subscribeId: null,
  subDate: null,
  customerId: null
}

const defaultState = {
  user: { ...defaultUser },
  pending: false,
  isLoggedIn: false,
  checkedForToken: false,
  error: null,
  token: ""
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...state, pending: true }

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        pending: false,
        error: null,
        user: normalizeUser(action.payload)
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        pending: false,
        isLoggedIn: false,
        error: normalizeErrorMsg(action.payload)
      }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        error: null,
        isLoggedIn: false,
        pending: false
      }

    case REGISTRATION_SUCCESS:
      const { username, email } = action.payload
      return {
        ...state,
        pending: false,
        error: null,
        user: { username, email }
      }
    case REGISTRATION_FAILURE:
      return { ...state, error: normalizeErrorMsg(action.payload) }

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

    case UPDATE_USER_IN_STORE:
      return {
        ...state,
        user: normalizeUser({ ...state.user, ...action.payload })
      }

    default:
      return state
  }
}
