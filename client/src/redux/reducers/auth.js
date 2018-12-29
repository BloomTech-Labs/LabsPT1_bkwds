import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/types"

const defaultState = {
  user: {},
  isLoggedIn: false,
  isSignedUp: false,
  isError: false,
  error: null
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const {
        email,
        username,
        createdAt,
        updatedAt,
        _id
      } = action.payload.data.user
      return {
        ...state,
        isLoggedIn: true,
        user: { email, username, createdAt, updatedAt, id: _id }
      }
    case LOGOUT_SUCCESS:
      return { ...state, user: {}, isLoggedIn: false }
    default:
      return state
  }
}
