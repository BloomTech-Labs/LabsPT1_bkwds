import React from "react"
import { Link } from "react-router-dom"

import BannerContainer from "../../Containers/BannerContainer"
import ChevronSvg from "../../icons/ChevronSvg"
import UserSvg from "../../icons/UserSvg"
import * as s from "./styles"

class MobileTopNav extends React.Component {
  initialClasses = ["drawer"]
  state = { scrollY: 0, drawerOpen: true, drawerClasses: this.initialClasses }

  handleScroll = e => {
    console.log("SCROLL:", e)
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
    console.log("PREVSTATE", prevState)
    if (this.state.scrollY > 100 && this.state.drawerOpen) this.closeDrawer()
    if (this.state.scrollY < 100 && !this.state.drawerOpen) this.openDrawer()
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  render() {
    return (
      <div>
        <s.MobileTopNavStyles id="MobileTopNavStyles">
          <div
            className={
              "banner-and-top-nav-wrapper " + this.state.drawerClasses.join(" ")
            }
          >
            <BannerContainer />
            <div className="landing-page-nav">
              {/* 1024px or less ONLY */}
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
          </div>
        </s.MobileTopNavStyles>

        <s.MobileBottomNavStyles>
          <div
            className="mobile-bottom-nav"
            style={{ top: this.state.drawerOpen ? null : "-1.275rem" }}
          >
            {/* <div className="mobile-bottom-nav"> */}
            <div className="mobile-bottom-nav-left">
              {/* <h3>The wave Mattress</h3> */}
              <p>Read reviews</p>
            </div>
            <div className="mobile-bottom-nav-right">
              <div className="mobile-bottom-cta-wrapper">
                <div className="mobile-bottom-cta-text">
                  {/* <h2>Starting at $10/year</h2> */}
                  <p>3 plans available</p>
                </div>
                {/* <button>Choose your plan</button> */}
              </div>
            </div>
          </div>
        </s.MobileBottomNavStyles>
      </div>
    )
  }
}

// const MobileBottomNav = () => (
//   <s.MobileBottomNavStyles>
//     {/* <div className="mobile-bottom-nav" style={{this.state.drawerOpen ? null : top: "3rem"}}> */}
//     <div className="mobile-bottom-nav">
//       <div className="mobile-bottom-nav-left">
//         <h3>The wave Mattress</h3>
//         <p>Read reviews</p>
//       </div>
//       <div className="mobile-bottom-nav-right">
//         <div className="mobile-bottom-cta-wrapper">
//           <div className="mobile-bottom-cta-text">
//             <h2>Starting at $10/year</h2>
//             <p>3 plans available</p>
//           </div>
//           <button>Choose your plan</button>
//         </div>
//       </div>
//     </div>
//   </s.MobileBottomNavStyles>
// )

const LandingNav = () => (
  <>
    <MobileTopNav />
    {/* <MobileBottomNav /> */}
  </>
)

export default LandingNav
