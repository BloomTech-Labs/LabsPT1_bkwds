import React from "react"
import { Link, Redirect } from "react-router-dom"
import PropTypes from "prop-types"

import Banner from "./Banner"
import ChevronSvg from "./icons/ChevronSvg"
import UserSvg from "./icons/UserSvg"
import { Button } from "../styles/theme/styledComponents"
import * as s from "../styles/LandingNav.styles"

class LandingNav extends React.Component {
  initialClasses = ["drawer"]
  state = {
    scrollY: 0,
    width: document.documentElement.clientWidth,
    drawerOpen: true,
    drawerClasses: this.initialClasses
  }

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

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(_, prevState) {
    const { scrollY } = this.props
    if (this.state.scrollY > scrollY && prevState.drawerOpen) this.closeDrawer()
    if (this.state.scrollY < scrollY && !prevState.drawerOpen) this.openDrawer()
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  render() {
    return (
      <>
        <s.LandingNavStyles>
          <div
            className={
              "banner-and-top-nav-wrapper " + this.state.drawerClasses.join(" ")
            }
          >
            <Banner seconds={9} />

            <div className="landing-page-mobile-top-nav">
              <div className="landing-page-nav">
                <div className="landing-page-mobile-menu">
                  <div className="landing-page-mobile-logo">
                    <span>
                      <span className="translate-letter">B</span>T
                    </span>
                  </div>
                  <button
                    className="landing-page-mobile-cta"
                    onClick={() => <Redirect to="/register" />}
                  >
                    <Link to="/login">Login</Link>
                    <ChevronSvg height={"1.15rem"} />
                  </button>
                </div>
                <div className="landing-page-mobile-links">
                  <Link to="/settings">
                    <UserSvg width="1.188" height="1.313" />
                  </Link>
                </div>
              </div>
            </div>
            {/* 1024px or less ONLY */}
          </div>
          {/* END: 1024px or less ONLY */}
        </s.LandingNavStyles>

        <s.LandingNavBottomStyles>
          <div className="hide-mobile-nav-on-desktop">
            {/* UP ON MOBILE */}
            <div className="split-top">
              <div
                className="mobile-bottom-nav"
                style={{
                  transform: this.state.drawerOpen
                    ? this.state.width <= 768
                      ? "translateY(4.365rem)"
                      : "translateY(3.75rem)"
                    : "translateY(0rem)"
                }}
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
                <div
                  className="mobile-bottom-cta-wrapper"
                  style={{
                    top:
                      !this.state.drawerOpen && this.state.width >= 768
                        ? "3.4rem"
                        : "inherit"
                  }}
                >
                  <div className="mobile-bottom-cta-text">
                    <h2>Starting at $9.99/year</h2>
                    <p>3 plans available</p>
                  </div>
                  <Button>Choose your plan</Button>
                </div>
              </div>
            </div>

            {/* Bottom Right Nav, Tablets + Only */}
            <div>
              <div className="tablet-bottom-nav-right">
                <div
                  className="tablet-bottom-cta-wrapper"
                  style={{
                    transform:
                      this.state.width >= 768 && this.state.drawerOpen
                        ? "translateY(2.9625rem)"
                        : "translateY(-0.87125rem)"
                  }}
                >
                  <div className="tablet-bottom-cta-text">
                    <h2>Starting at $9.99/year</h2>
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

LandingNav.propTypes = {
  scrollY: PropTypes.number
}

LandingNav.defaultProps = {
  scrollY: 100
}

export default LandingNav
