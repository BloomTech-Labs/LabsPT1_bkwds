import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import moment from "moment"

import * as s from "../styles/Dashboard.styles"
import Modal from "./modals/Modal"
import { Form, GhostInput, Button } from "../styles/theme/styledComponents"
import { UserPropTypes } from "./propTypes"

const DashboardHome = ({ user }) => {
  return (
    <s.DashboardStyles>
      {user.displayName && <h1>Hi, {user.displayName}!</h1>}
      {!user.displayName && <h1>Welcome {user.email}!</h1>}
      <div>Last login: {moment(user.lastLogin).format("LLL")}</div>
      <div>Login count: {user.loginCount}</div>
      {user.formattedAddress && <div>Location: {user.formattedAddress}</div>}

      <Modal isOpen={modalIsOpen}>
        {() => (
          <div className="onboarding-flow">
            <div className="flow-header">
              <h4>Create your profile</h4>
              <div>
                This will give you a place to store trips and plan new ones
                safely.
              </div>
            </div>
            <Form
              onSubmit={this.updateUserValues({
                location,
                formattedAddress
              })}
            >
              <label>Display Name</label>
              <GhostInput
                value={this.state.displayName}
                onChange={this.handleChange("displayName")}
                placeholder="What should we call you?"
              />
              <label>Location</label>
              <GhostInput
                value={this.state.query}
                onChange={this.handleChange("query")}
                placeholder="Search for location..."
                ref={this.inputRef}
              />
              <div>{formattedAddress}</div>
              <div>{location.lat && location.lat + location.lng}</div>
              <div className="text-align-right">
                <Button className="btn">Save</Button>
              </div>
            </Form>
          </div>
        )}
      </Modal>
    </s.DashboardStyles>
  )
}

DashboardHome.propTypes = {
  user: PropTypes.objectOf(UserPropTypes)
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(DashboardHome)
