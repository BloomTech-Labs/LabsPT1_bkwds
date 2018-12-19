import React from "react"
import { Link, withRouter } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
import "./index.css"

const BreadcrumbBar = props => {
  const crumbs = props.location.pathname.split("/").slice(1)
  return (
    <div id="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        {crumbs.map((crumb, index) => (
          <BreadcrumbItem active={index === crumbs.length - 1} key={crumb}>
            <Link to={props.location.pathname}>{crumb}</Link>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </div>
  )
}

export default withRouter(BreadcrumbBar)
