import React from "react"
import { Container, Row, Col, Button } from "reactstrap"
import Sidebar from "./components/Sidebar"
import BreadcrumbBar from "./components/Breadcrumb"

const LayoutWrapper = props => {
  return (
    <Container fluid>
      <Row id="topMenu" xs="12">
        <Col id="breadcrumb" xs="auto" className="mr-auto">
          {props.location.pathname !== "/" && <BreadcrumbBar {...props} />}
        </Col>
        <Col id="authButton" xs="auto">
          <Button>Sign Up</Button>
          <Button>Sign In</Button>
          <Button>Sign Out</Button>
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
  )
}
export default LayoutWrapper
