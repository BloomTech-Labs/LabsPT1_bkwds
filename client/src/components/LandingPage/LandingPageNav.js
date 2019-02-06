import React from "react"
import styled from "styled-components"
import { Link, NavLink } from "react-router-dom"

const NavigationMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 500px;
  height: 50px;
  width: 100%;
  margin-top: 42px;
`

const Img = styled.img`
  width: 128px;
  margin-left: 90px;
`

const Menu = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 110px);
  margin-right: 5%;
  text-align: center;
  justify-content: space-around;

  a {
    font-size: 20px;
    color: white !important;
    text-decoration: none;
  }
`

const Nav = () => {
  return (
    <NavigationMenu>
      <div>
        <Img src="/images/bkwdslogo.png" />
      </div>
      <Menu>
        <NavLink to="/features">Features</NavLink>
        <Link to="/about">About</Link>
        <Link to="/login">Log in</Link>
        <Link to="/register">Sign up</Link>
      </Menu>
    </NavigationMenu>
  )
}

export default Nav
