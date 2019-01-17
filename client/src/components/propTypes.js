import PropTypes from "prop-types"

export const TripPropTypes = PropTypes.shape({
  end: PropTypes.string,
  id: PropTypes.string,
  inProgress: PropTypes.bool,
  isArchived: PropTypes.bool,
  lat: PropTypes.number,
  lon: PropTypes.number,
  name: PropTypes.string,
  start: PropTypes.string,
  userId: PropTypes.string,
  waypoints: PropTypes.arrayOf(PropTypes.string)
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
