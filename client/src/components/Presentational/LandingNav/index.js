import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { logout } from "../../../redux/actions/auth"

import BannerContainer from "../../Containers/BannerContainer"
import GitHubSvg from "../../icons/GitHubSvg"
import ChevronSvg from "../../icons/ChevronSvg"
import UserSvg from "../../icons/UserSvg"
import { Button } from "../../../theme/styledComponents"
import * as s from "./styles"

// TODO: Refactor LandingPageNav and Nav components, stop borrowing from each other
import { NavStyles } from "../../Nav/styles"
import UnauthenticatedLinks from "../../Nav/UnauthenticatedLinks"
import AuthenticatedLinks from "../../Nav/AuthenticatedLinks"

class LandingNav extends React.Component {
  initialClasses = ["drawer"]
  state = { scrollY: 0, drawerOpen: true, drawerClasses: this.initialClasses }

  handleScroll = () => {
    this.setState({ scrollY: window.scrollY })
  }

  openDrawer = () => {
    this.setState({
      drawerOpen: true,
      drawerClasses: [...this.initialClasses, "open-drawer"]
    })
  }

  closeDrawer = () => {
    this.setState({
      drawerOpen: false,
      drawerClasses: [...this.initialClasses, "close-drawer"]
    })
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentDidUpdate(_, prevState) {
    console.log("logging bc i have to use _ to appease travis CI", _)
    if (this.state.scrollY > 100 && prevState.drawerOpen) this.closeDrawer()
    if (this.state.scrollY < 100 && !prevState.drawerOpen) this.openDrawer()
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  render() {
    const { location, logout, isLoggedIn } = this.props
    const { pathname } = location

    return (
      <>
        <s.LandingNavStyles>
          <div
            className={
              "banner-and-top-nav-wrapper " + this.state.drawerClasses.join(" ")
            }
          >
            <BannerContainer />

            {/* TODO: Kills this dead */}
            {/* 1024px+ ONLY */}
            <NavStyles>
              <div className="logo">Backwoods Tracker</div>
              <div className="nav-links-wrapper">
                {!isLoggedIn ? (
                  <UnauthenticatedLinks pathname={pathname} />
                ) : (
                  <AuthenticatedLinks logout={logout} />
                )}
                {isLoggedIn ? <AuthenticatedLinks logout={logout} /> : null}
              </div>
              <div className="call-to-action">
                <GitHubSvg width="32px" height="32px" />
              </div>
            </NavStyles>
          </div>
          {/* END 1024px ONLY */}

          {/* 1024px or less ONLY */}
          <div className="landing-page-nav">
            <div className="landing-page-mobile-top-nav">
              <div className="landing-page-mobile-menu">
                <div className="landing-page-mobile-logo">
                  <span>
                    <span className="translate-letter">B</span>T
                  </span>
                </div>
                <button className="landing-page-mobile-cta">
                  Register
                  <ChevronSvg height={"1.15rem"} />
                </button>
              </div>
              <div className="landing-page-mobile-links">
                <Link to="/settings">
                  <UserSvg width="1.188rem" height="1.313rem" />
                </Link>
              </div>
            </div>
          </div>
          {/* END: 1024px or less ONLY */}
        </s.LandingNavStyles>

        <s.LandingNavBottomStyles>
          <div className="hide-mobile-nav-on-desktop">
            {/* UP ON MOBILE */}
            <div className="split-top">
              <div
                className="mobile-bottom-nav"
                style={{ top: this.state.drawerOpen ? null : "-1.275rem" }}
              >
                <div className="mobile-bottom-nav-left split-top-on-mobile">
                  <h1>Your First Trip is Free!</h1>
                  <button>Learn More</button>
                </div>
              </div>
            </div>

            {/* DOWN ON MOBILE */}
            <div className="split-bottom">
              <div className="mobile-bottom-nav-right split-bottom-on-mobile">
                <div className="mobile-bottom-cta-wrapper">
                  <div className="mobile-bottom-cta-text">
                    <h2>Starting at $10/year</h2>
                    <p>3 plans available</p>
                  </div>
                  <Button>Choose your plan</Button>
                </div>
              </div>
            </div>
          </div>
        </s.LandingNavBottomStyles>
      </>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = { logout }

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LandingNav)
)
