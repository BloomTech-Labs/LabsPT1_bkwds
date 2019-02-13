import React from "react"
import { connect } from "react-redux"
import { push as Menu } from "react-burger-menu"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const MobileMenu = ({ isOpen }) => (
  <Menu
    customBurgerIcon={false}
    customCrossIcon={false}
    isOpen={isOpen}
    outerContainerId="landing-page"
    pageWrapId="hero"
  >
    <Link to="/login">Log in</Link>
    <Link to="/register">Sign Up</Link>
  </Menu>
)

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired
}

export default connect(({ navigation }) => ({
  isOpen: navigation.isSidebarOpen
}))(MobileMenu)
