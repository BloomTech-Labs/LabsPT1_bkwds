import React from "react"
import { Container, Row, Col, ButtonGroup, Button } from "reactstrap"

const LayoutWrapper = () => {
  return (
    <Container fluid>
      <Row id="topMenu" xs="12">
        <Col id="breadcrumb" xs="auto" className="mr-auto">
          {this.props.location.pathname !== "/" && "Breadcumb here!"}
        </Col>
        <Col id="authButton" xs="auto">
          <Button>Sign In</Button>
          <Button>Sign Out</Button>
          <Button>Sign Up</Button>
        </Col>
      </Row>
      <Row>
        {this.props.location.pathname !== "/" && (
          <Col id="sidebar" xs="4">
            <ButtonGroup vertical>
              <Button>Trips</Button>
              <Button>Billing</Button>
              <Button>Settings</Button>
            </ButtonGroup>
          </Col>
        )}
        <Col id="mainSection" xs="8">
          {this.props.children}
        </Col>
      </Row>
    </Container>
  )
}
