import {
  INI_UPDATE_SETTINGS,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAILURE
} from "../actions/types"

const defaultState = {
  pending: false,
  error: null
}

export const settingsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INI_UPDATE_SETTINGS:
      return {
        ...state,
        pending: true
      }
    case UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        pending: false
      }

    case UPDATE_SETTINGS_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload
      }

    default:
      return state
  }
}
