import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { toggleSidebar } from "../../redux/actions/navigation"
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
    display: none;
    visibility: hidden;

    .links {
      width: 100%;
      height: 54px;
      button {
        color: black !important;
        font-size: 1.35rem;
      }
    }
  `}
`

const HamburberMenu = styled.i`
  display: none;
  visibility: hidden;

  ${media.phone`
    display: block;
    visibility: visible;
    color: white;
    align-self: center;
    justify-self: flex-end;
    margin-right: 10px;
  `}
`

const Header = ({ isOpen, toggleSidebar }) => (
  <>
    <HeaderContainer>
      <Logo src="/images/bkwdslogo.png" />
      <Menu>
        <li className="links">
          <button onClick={() => scrollTo("features")}>Features</button>
        </li>
        <li className="links">
          <Link to="/login">Log in</Link>
        </li>
        <li className="links">
          <Link to="/register">Sign Up</Link>
        </li>
      </Menu>
      <HamburberMenu
        className="fas fa-bars"
        onClick={() => toggleSidebar(isOpen)}
      />
    </HeaderContainer>
  </>
)

export default connect(
  ({ navigation }) => ({
    isOpen: navigation.isSidebarOpen,
    menuState: navigation.menuState
  }),
  { toggleSidebar }
)(Header)
