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

export const cancelSubscription = ({ id, subscribeId }) => async dispatch => {
  dispatch({ type: CANCEL })

  let token
  try {
    token = localStorage.getItem("jwt")
  } catch (e) {
    console.error(e)
  }
  if (!token) return

  const result = await axios.post(
    `${SERVER_URI}/subscribe/cancel/${id}`,
    { subscribeId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  )
  if (result && result.data) {
    dispatch({ type: CANCEL_SUBSCRIPTION_SUCCESS, payload: result.data })
    dispatch({ type: QUERYING_USER_BY_TOKEN_SUCCESS, payload: result.data })
  } else {
    dispatch({ type: CANCEL_SUBSCRIPTION_FAIL, payload: result.error })
  }
}

export const subscribe = ({ id, owner, stripe }) => async dispatch => {
  dispatch({ type: SUBSCRIBE })

  let token
  try {
    token = localStorage.getItem("jwt")
  } catch (e) {
    console.error(e)
  }
  if (!token) return

  const { source } = await stripe.createSource({ type: "card" })
  const updatedSource = { ...source, owner }
  const subscribedUser = await axios.post(
    `${SERVER_URI}/subscribe/${id}`,
    {
      planId: process.env.STRIPE_PLAN_ID_TEST,
      source: updatedSource
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    }
  )
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
