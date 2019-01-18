import PropTypes from "prop-types"

export const TripPropTypes = PropTypes.shape({
  end: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  inProgress: PropTypes.bool.isRequired,
  isArchived: PropTypes.bool.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  waypoints: PropTypes.array.isRequired
})

export const UserPropTypes = PropTypes.shape({
  createdAt: PropTypes.string.isRequired,
  customerId: PropTypes.string,
  email: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  subDate: PropTypes.string,
  subscribeId: PropTypes.string,
  subscribed: PropTypes.bool.isRequired,
  trips: PropTypes.arrayOf(PropTypes.string),
  username: PropTypes.string.isRequired
})
