import axios from "axios"
import Scriptly from "scriptly"
import { push } from "connected-react-router"

import { SERVER_URI } from "../../config"
import {
  INIT_NEW_SUBSCRIPTION,
  SUBSCRIBE_PENDING,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAIL,
  INIT_NEW_CANCELLATION,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_FAIL,
  QUERYING_USER_BY_TOKEN_SUCCESS,
  INIT_NEW_INVOICES,
  INVOICES_SUCCESS,
  INVOICES_FAIL
} from "./types"
import { updateUserInStore } from "./auth"
import { STRIPE_PLAN_ID_TEST, STRIPE_KEY } from "../../config"

import { toast } from "react-toastify"
import { normalizeErrorMsg } from "../../utils/selectors"

const token = localStorage.getItem("token")
if (token) {
  // If token, set token as Authorization header on all requests:
  axios.defaults.headers.common["Authorization"] = token
}

const createStripeInstance = async () => {
  await Scriptly.loadJavascript("https://js.stripe.com/v3/")
  return window.Stripe(STRIPE_KEY)
}

export const openCheckoutForm = () => async (dispatch, getState) => {
  // Check to see if we've already created a Stripe instance and re-use it else create one
  const stripe = getState().billing.stripe || (await createStripeInstance())

  dispatch({ type: INIT_NEW_SUBSCRIPTION, stripe })
}

export const closeCheckoutForm = () => dispatch => {
  dispatch({ type: CANCEL_SUBSCRIPTION_SUCCESS })
}

export const cancelSubscription = ({ id, subscribeId }) => async dispatch => {
  dispatch({ type: INIT_NEW_CANCELLATION })

  if (!token) return

  try {
    const result = await axios.post(`${SERVER_URI}/subscribe/cancel/${id}`, {
      subscribeId
    })
    dispatch({ type: CANCEL_SUBSCRIPTION_SUCCESS, payload: result.data })
    dispatch({ type: QUERYING_USER_BY_TOKEN_SUCCESS, payload: result.data })
    dispatch(push("/app/upgrade"))
  } catch (error) {
    dispatch({
      type: CANCEL_SUBSCRIPTION_FAIL,
      payload: normalizeErrorMsg(error)
    })
    toast.error(normalizeErrorMsg(error), {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
}

export const subscribe = ({ id, owner, stripe }) => async dispatch => {
  if (!token) return
  dispatch({ type: SUBSCRIBE_PENDING })

  try {
    const { source } = await stripe.createSource({ type: "card" })
    const updatedSource = { ...source, owner }
    const newSubscription = await axios.post(`${SERVER_URI}/subscribe/${id}`, {
      planId: STRIPE_PLAN_ID_TEST,
      source: updatedSource
    })

    dispatch({ type: SUBSCRIBE_SUCCESS })
    dispatch(updateUserInStore(newSubscription.data))

    toast.success("Successful subscription", {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  } catch (error) {
    dispatch({ type: SUBSCRIBE_FAIL, payload: normalizeErrorMsg(error) })
    toast.error(normalizeErrorMsg(error), {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
}

export const retrieveInvoices = (customerId, subscribeId) => async dispatch => {
  dispatch({ type: INIT_NEW_INVOICES })

  if (!token) return

  try {
    const result = await axios.post(`${SERVER_URI}/subscribe/invoices`, {
      customerId,
      subscribeId
    })

    dispatch({ type: INVOICES_SUCCESS, payload: result.data })
  } catch (error) {
    dispatch({ type: INVOICES_FAIL, payload: normalizeErrorMsg(error) })
    toast.error(normalizeErrorMsg(error), {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
}
