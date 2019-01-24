import { OPEN_MODAL, CLOSE_MODAL } from "../actions/types"

const defaultState = {
  isOpen: false
}

export const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isOpen: true }
    case CLOSE_MODAL:
      return { ...state, isOpen: false }
    default:
      return state
  }
}
