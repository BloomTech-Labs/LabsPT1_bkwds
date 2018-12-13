import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "reactstrap"
import Sidebar from "../Sidebar"
import BreadcrumbBar from "../Breadcrumb"
import "./index.css"

const LayoutWrapper = props => {
  return (
    <div id="layoutWrapper">
      <Container fluid>
        <Row id="topMenu" xs="12">
          <Col id="breadcrumb" xs="auto" className="mr-auto">
            {props.location.pathname !== "/" &&
              props.location.pathname !== "/login" &&
              props.location.pathname !== "/signup" && (
                <BreadcrumbBar {...props} />
              )}
          </Col>
          <Col id="authButton" xs="auto">
            {props.location.pathname !== "/signup" && (
              <Button>
                <Link to="/signup">Sign Up</Link>
              </Button>
            )}
            {!props.isLoggedIn && props.location.pathname !== "/login" && (
              <Button>
                <Link to="/login">Log In</Link>
              </Button>
            )}
            {props.isLoggedIn && (
              <Button>
                <Link to="/">Sign Out</Link>
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          {props.location.pathname !== "/" && (
            <Col id="sidebar" xs="4">
              <Sidebar {...props} />
            </Col>
          )}
          <Col id="mainSection" xs="8">
            {props.children}
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default LayoutWrapper
