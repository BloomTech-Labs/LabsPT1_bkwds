import PropTypes from "prop-types"

export const TripPropTypes = PropTypes.shape({
  end: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  inProgress: PropTypes.bool.isRequired,
  isArchived: PropTypes.bool.isRequired,
  lat: PropTypes.number,
  lon: PropTypes.number,
  name: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  waypoints: PropTypes.array.isRequired
})

export const getDefaultTripProps = overrides => {
  const defaults = {
    end: "",
    id: "",
    inProgress: false,
    isArchived: false,
    lat: 0,
    lon: 0,
    name: "",
    start: "",
    userId: "",
    waypoints: []
  }
  return Object.assign({}, defaults, overrides)
}

export const UserPropTypes = PropTypes.shape({
  createdAt: PropTypes.string.isRequired,
  customerId: PropTypes.string,
  email: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  subDate: PropTypes.string,
  subscribeId: PropTypes.string,
  subscribed: PropTypes.bool.isRequired,
  trips: PropTypes.arrayOf(PropTypes.any)
})

export const MatchPropTypes = PropTypes.shape({
  isExact: PropTypes.bool.isRequired,
  params: PropTypes.object,
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
})
