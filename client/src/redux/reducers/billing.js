import {
  INIT_NEW_SUBSCRIPTION,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAIL,
  INIT_NEW_CANCELLATION,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_FAIL,
  INIT_NEW_INVOICES,
  INVOICES_SUCCESS,
  INVOICES_FAIL
} from "../actions/types"

const defaultState = {
  pending: false,
  error: null,
  isCheckoutFormOpen: false,
  invoices: null
}

export const billingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INIT_NEW_SUBSCRIPTION:
      return {
        ...state,
        pending: true,
        isCheckoutFormOpen: true
      }

    case SUBSCRIBE_SUCCESS:
      return {
        ...state,
        pending: false,
        isCheckoutFormOpen: false
      }

    case SUBSCRIBE_FAIL:
      return {
        ...state,
        pending: false,
        isCheckoutFormOpen: true,
        error: action.payload
      }

    case INIT_NEW_CANCELLATION:
      return {
        ...state,
        pending: true,
        isCheckoutFormOpen: false
      }

    case CANCEL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        pending: false,
        isCheckoutFormOpen: false
      }

    case CANCEL_SUBSCRIPTION_FAIL:
      return {
        ...state,
        pending: false,
        isCheckoutFormOpen: false,
        error: action.payload
      }

    case INIT_NEW_INVOICES:
      return {
        ...state,
        pending: true
      }

    case INVOICES_SUCCESS:
      return {
        ...state,
        pending: false,
        isCheckoutFormOpen: false,
        invoices: action.payload
      }
    case INVOICES_FAIL:
      return {
        ...state,
        pending: false,
        isCheckoutFormOpen: false,
        error: action.payload
      }

    default:
      return state
  }
}
