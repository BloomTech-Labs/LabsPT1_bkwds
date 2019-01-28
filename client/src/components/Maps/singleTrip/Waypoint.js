import React from "react"
import PropTypes from "prop-types"

import * as s from "./components"
import DeleteIcon from "../../icons/DeleteIcon"

const Waypoint = ({ i, isEditing, handleDelete, handleEdit, name }) => (
  <s.Waypoint key={i}>
    <s.WaypointLabel>{i + 1}</s.WaypointLabel>
    <s.WaypointInput
      type="text"
      disabled={isEditing === false}
      edit={isEditing}
      placeholder="waypoint title"
      value={name}
      onChange={e => handleEdit(e, i)}
    />

    <s.DeleteButton
      disabled={isEditing === false}
      edit={isEditing}
      onClick={() => handleDelete(i)}
    >
      <DeleteIcon width="22px" height="22px" />
    </s.DeleteButton>
  </s.Waypoint>
)

Waypoint.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
  isEditing: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
}

export default Waypoint
