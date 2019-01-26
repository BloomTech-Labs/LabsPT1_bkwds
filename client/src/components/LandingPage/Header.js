import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { scrollTo } from "../../utils"

const NavigationMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 30px;
  padding: 0 100px;
  height: 30px;
  width: 100%;
`

const Img = styled.img`
  width: 128px;
`

const Menu = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 110px);
  text-align: center;
  justify-content: flex-end;

  a {
    align-self: center;
    color: white !important;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  a:hover {
    color: #f9f9f9;
    font-weight: 600;
    text-decoration: none;
  }
`

const Nav = () => (
  <NavigationMenu>
    <Img src="/images/bkwdslogo.png" />
    <Menu>
      <a onClick={() => scrollTo("features")}>Features</a>
      <Link to="/login">Log in</Link>
      <Link to="/register">Sign up</Link>
    </Menu>
  </NavigationMenu>
)

export default Nav
