import { TOGGLE_SIDEBAR } from "../actions/types"

const defaultState = {
  isSidebarOpen: false
}

export const navigationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, isSidebarOpen: !action.payload }

    default:
      return state
  }
}
