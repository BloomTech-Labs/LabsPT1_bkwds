import React from "react"
import PropTypes from "prop-types"

const AddSvg = ({ width = "18px", height = "18px" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width}
      height={height}
      viewBox="0 0 42 42"
    >
      <polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22 " />
      <g />
    </svg>
  )
}

AddSvg.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
}

export default AddSvg
