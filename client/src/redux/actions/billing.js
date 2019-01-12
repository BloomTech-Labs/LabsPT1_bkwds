import axios from "axios"
import { SERVER_URI } from "../../config"
import {
  SUBSCRIBE,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAIL,
  CANCEL,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_FAIL,
  QUERYING_USER_BY_TOKEN_SUCCESS
} from "./types"

let token
try {
  token = localStorage.getItem("token")
} catch (err) {
  console.error("Could not parse token from localStorage:", err)
}

// Set token as Authorization header on all requests:
axios.defaults.headers.common["Authorization"] = token

export const cancelSubscription = ({ id, subscribeId }) => async dispatch => {
  dispatch({ type: CANCEL })

  if (!token) return

  const result = await axios.post(`${SERVER_URI}/subscribe/cancel/${id}`, {
    subscribeId
  })
  if (result && result.data) {
    dispatch({ type: CANCEL_SUBSCRIPTION_SUCCESS, payload: result.data })
    dispatch({ type: QUERYING_USER_BY_TOKEN_SUCCESS, payload: result.data })
  } else {
    dispatch({ type: CANCEL_SUBSCRIPTION_FAIL, payload: result.error })
  }
}

export const subscribe = ({ id, owner, stripe }) => async dispatch => {
  dispatch({ type: SUBSCRIBE })

  if (!token) return

  const { source } = await stripe.createSource({ type: "card" })
  const updatedSource = { ...source, owner }
  const subscribedUser = await axios.post(`${SERVER_URI}/subscribe/${id}`, {
    planId: process.env.STRIPE_PLAN_ID_TEST,
    source: updatedSource
  })
  if (subscribedUser) {
    dispatch({ type: SUBSCRIBE_SUCCESS, payload: subscribedUser.data })
    dispatch({
      type: QUERYING_USER_BY_TOKEN_SUCCESS,
      payload: subscribedUser.data
    })
  } else {
    dispatch({ type: SUBSCRIBE_FAIL, payload: subscribedUser.error })
  }
}
