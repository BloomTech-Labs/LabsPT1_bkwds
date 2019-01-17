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
