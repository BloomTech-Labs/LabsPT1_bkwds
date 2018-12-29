import React from "react"
import { Link } from "react-router-dom"

const Breadcrumb = ({ linkpath, name, last }) => {
  return (
    <li>
      <Link className={last ? "current-path" : null} to={linkpath}>
        {name}
      </Link>
    </li>
  )
}

export default Breadcrumb
