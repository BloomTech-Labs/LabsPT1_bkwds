import { FETCH_TRIPS } from "../actions/types"

const defaultState = {
  trips: [{ id: 1, name: "some trip" }]
}

export const tripsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_TRIPS:
      return { ...state }
    default:
      return state
  }
}
