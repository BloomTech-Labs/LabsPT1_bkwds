import {
  INIT_NEW_SUBSCRIPTION,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAIL,
  INIT_NEW_CANCELLATION,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_FAIL
} from "../actions/types"

const defaultState = {
  pending: false,
  error: null
}

export const billingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INIT_NEW_SUBSCRIPTION:
      return {
        ...state,
        pending: true
      }

    case SUBSCRIBE_SUCCESS:
      return {
        ...state,
        pending: false
      }

    case SUBSCRIBE_FAIL:
      return { ...state, pending: false, error: action.payload }

    case INIT_NEW_CANCELLATION:
      return { ...state, pending: true }

    case CANCEL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        pending: false
      }

    case CANCEL_SUBSCRIPTION_FAIL:
      return {
        ...state,
        pending: false,
        error: action.payload
      }

    default:
      return state
  }
}
