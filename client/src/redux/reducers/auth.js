import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/types"

const defaultState = {
  user: null,
  isLoggedIn: false,
  isSignedUp: false,
  isError: false,
  error: null
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const { email, username, createdAt, updatedAt } = action.payload.data.user
      return {
        ...state,
        isLoggedIn: true,
        user: { email, username, createdAt, updatedAt }
      }
    case LOGOUT_SUCCESS:
      return { ...state, user: null, isLoggedIn: false }
    default:
      return state
  }
}
