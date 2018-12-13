import React from "react"
import { Link } from "react-router-dom"
import { ButtonGroup, Button } from "reactstrap"
import "./index.css"

const Sidebar = props => {
  return (
    <div id="sidebar">
      <ButtonGroup vertical>
        <Button
          color={props.location.pathname === "/trips" ? "primary" : "secondary"}
        >
          <Link to="/trips">Trips</Link>
        </Button>
        <Button
          color={
            props.location.pathname === "/billing" ? "primary" : "secondary"
          }
        >
          <Link to="/billing">Billing</Link>
        </Button>
        <Button
          color={
            props.location.pathname === "/settings" ? "primary" : "secondary"
          }
        >
          <Link to="/settings">Settings</Link>
        </Button>
      </ButtonGroup>
    </div>
  )
}
export default Sidebar
