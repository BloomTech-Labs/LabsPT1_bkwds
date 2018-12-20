import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/types"

const defaultState = {
  auth: {
    user: null,
    isLoggedIn: false,
    isSignedUp: false,
    isError: false,
    error: null
  }
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true }
    case LOGOUT_SUCCESS:
      return { ...state, isLoggedIn: false }
    default:
      return state
  }
}
