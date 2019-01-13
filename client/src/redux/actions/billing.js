import axios from "axios"
import { SERVER_URI } from "../../config"
import {
  INIT_NEW_SUBSCRIPTION,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAIL,
  INIT_NEW_CANCELLATION,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_FAIL,
  QUERYING_USER_BY_TOKEN_SUCCESS
} from "./types"
import { updateUserInStore } from "./auth"
import { STRIPE_PLAN_ID_TEST } from "../../config"

import { toast } from "react-toastify"
import { normalizeErrorMsg } from "../../utils/selectors"

const token = localStorage.getItem("token")
if (token) {
  // If token, set token as Authorization header on all requests:
  axios.defaults.headers.common["Authorization"] = token
}

export const openCheckoutForm = () => dispatch => {
  dispatch({ type: INIT_NEW_SUBSCRIPTION })
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
  } catch (error) {
    dispatch({ type: CANCEL_SUBSCRIPTION_FAIL, payload: error })
    toast.error(normalizeErrorMsg(error), {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
}

export const subscribe = ({ id, owner, stripe }) => async dispatch => {
  if (!token) return

  try {
    const { source } = await stripe.createSource({ type: "card" })
    const updatedSource = { ...source, owner }
    const newSubscription = await axios.post(`${SERVER_URI}/subscribe/${id}`, {
      // TODO: Remove STRIPE_PLAN_ID_TEST out soon so things don't break in production, where it will not be defined
      planId: STRIPE_PLAN_ID_TEST,
      source: updatedSource
    })

    dispatch({ type: SUBSCRIBE_SUCCESS, payload: newSubscription.data })
    // TODO: Consider housing subscription information on billing reducer instead of user?
    dispatch(updateUserInStore(newSubscription.data))
    toast.success("Successful subscription", {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  } catch (error) {
    dispatch({ type: SUBSCRIBE_FAIL, payload: error })
    toast.error(normalizeErrorMsg(error), {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
}
