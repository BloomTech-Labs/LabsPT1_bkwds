import React, { PureComponent } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { HamburgerSpring } from "react-animated-burgers"

import { scrollTo } from "../../utils"
import { media } from "../../styles/theme/mixins"

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  grid-template-areas:
    "logo 🍔"
    "menu menu";
  margin-top: 30px;
  padding: 0 100px;
  height: 30px;
  width: 100%;

  ${media.tablet`
    padding: 0 50px;
  `}

  ${media.phone`
    padding: 0 25px;
  `}
`

const Logo = styled.img`
  grid-area: logo;
  align-self: center;
  width: 128px;
`

const Menu = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 110px);
  grid-area: menu;
  margin: 0;
  padding: 0;
  text-align: center;
  align-items: center;
  justify-content: flex-end;
  list-style-type: none;
  transition: display, visibility ease-in-out 0.3s;
  z-index: 2;

  a,
  button {
    display: inline;
    margin: 0;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    text-decoration: none;
    color: white !important;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  a:hover,
  button:hover {
    color: #f9f9f9;
    font-weight: 600;
    text-decoration: none;
  }

  ${media.phone`
    display: block;
    visibility: visible;

    .links {
      /* opacity: 1; */
      /* transition: opacity ease-in-out 0.3s; */
      width: 100%;
      height: 54px;
      button {
        color: black !important;
        font-size: 1.35rem;
      }
    }
  `}
`

const MobileMenu = styled.div`
  display: none;
  grid-area: 🍔;
  visibility: hidden;
  align-self: center;
  justify-self: flex-end;
  z-index: 2;

  .🍔 {
    outline: none;

    span,
    span::before,
    span::after {
      border-radius: 0;
      height: 2px;
    }
  }

  ${media.phone`
    display: block;
    visibility: visible;
  `}
`

// 🚧 WIP — for mobile menu
// const Overlay = styled.div`
//   top: 0;
//   left: 0;
//   position: absolute;
//   height: 100vh;
//   min-width: 100vw;
//   background: rgba(255, 255, 255, 0.5);
//   z-index: 1;
// `

class Header extends PureComponent {
  state = {
    isActive: false
  }

  toggleBurger = () => this.setState(prev => ({ isActive: !prev.isActive }))

  render() {
    return (
      <>
        <HeaderContainer>
          <Logo src="/images/bkwdslogo.png" />
          <MobileMenu>
            <HamburgerSpring
              isActive={this.state.isActive}
              toggleButton={this.toggleBurger}
              className="🍔"
              barColor="white"
              buttonWidth={30}
            />
          </MobileMenu>
          <Menu>
            <li className="links">
              <button onClick={() => scrollTo("features")}>Features</button>
            </li>
            <li className="links">
              <Link to="/register">Sign Up</Link>
            </li>
            <li className="links">
              <Link to="/login">Log in</Link>
            </li>
          </Menu>
        </HeaderContainer>
        {/* <Overlay /> */}
      </>
    )
  }
}

export default Header
