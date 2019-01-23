import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const Breadcrumb = ({ linkpath, name, last }) => {
  return (
    <li>
      <Link className={last ? "current-path" : null} to={linkpath}>
        {name}
      </Link>
    </li>
  )
}

Breadcrumb.propTypes = {
  linkpath: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  last: PropTypes.bool
}
export default Breadcrumb
