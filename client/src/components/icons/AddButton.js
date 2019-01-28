import React from "react"
import PropTypes from "prop-types"

const AddButton = ({ addWaypoint }) => (
  <svg
    onClick={addWaypoint}
    id="plus-icon"
    width="40"
    height="40"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Page-1" fill="none" fillRule="evenodd">
      <g id="Group" fillRule="nonzero">
        <path
          d="M10,0 C4.48,0 0,4.48 0,10 C0,15.52 4.48,20 10,20 C15.52,20 20,15.52 20,10 C20,4.48 15.52,0 10,0 Z"
          id="Path"
          fill="#FFF"
        />
        <path
          d="M10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 Z M15,11 L15,9 L11,9 L11,5 L9,5 L9,9 L5,9 L5,11 L9,11 L9,15 L11,15 L11,11 L15,11 Z"
          id="Shape"
          fill="#E4580D"
        />
      </g>
    </g>
  </svg>
)

AddButton.propTypes = {
  addWaypoint: PropTypes.func.isRequired
}

export default AddButton
