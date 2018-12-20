import {
  LOADING_TRIPS,
  LOADING_TRIPS_SUCCESS,
  LOADING_TRIPS_ERROR,
  CREATING_TRIP,
  CREATING_TRIP_SUCCESS,
  CREATING_TRIP_ERROR
} from "../actions/types"

export const tripReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOADING_TRIPS:
      return { ...state, loading: true }
    case LOADING_TRIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        trips: action.payload
      }
    case LOADING_TRIPS_ERROR:
      return { ...state, loading: false, error: action.payload }
    case CREATING_TRIP:
      return { ...state, loading: true }
    case CREATING_TRIP_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload]
      }
    case CREATING_TRIP_ERROR:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

const defaultState = {
  loading: false,
  error: null,
  trips: [
    // {
    //   isArchived: false,
    //   _id: "5c1b63f7882fa5849f8bacf2",
    //   userId: "5c152440cd78b73ce82d683c",
    //   name: "Trip 1 Name",
    //   start: "2015-10-19T23:54:28.566Z",
    //   end: "2018-12-20T09:41:08.566Z",
    //   lat: 30.2604,
    //   lon: 97.7145,
    //   createdAt: "2018-12-20T09:42:15.157Z",
    //   updatedAt: "2018-12-20T09:42:15.157Z",
    //   __v: 0
    // },
    // {
    //   isArchived: false,
    //   _id: "5c1b6423882fa5849f8bacf3",
    //   userId: "5c152440cd78b73ce82d683c",
    //   name: "Trip 2",
    //   start: "2016-10-01T05:14:28.566Z",
    //   end: "2018-05-02T22:07:48.566Z",
    //   lat: 33.2604,
    //   lon: 91.7145,
    //   createdAt: "2018-12-20T09:42:59.909Z",
    //   updatedAt: "2018-12-20T09:42:59.909Z",
    //   __v: 0
    // },
    // {
    //   isArchived: false,
    //   _id: "5c1b64ac7cedf084f9c8c0da",
    //   userId: "5c152440cd78b73ce82d683c",
    //   name: "Trip 3",
    //   start: "2007-03-30T23:54:28.566Z",
    //   end: "2008-10-29T16:47:48.566Z",
    //   lat: 30.2604,
    //   lon: 88.7145,
    //   createdAt: "2018-12-20T09:45:16.778Z",
    //   updatedAt: "2018-12-20T09:45:16.778Z",
    //   __v: 0
    // }
  ]
}
