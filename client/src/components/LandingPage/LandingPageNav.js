import React, { Component } from "react"
import styled from "styled-components"
import logo from "../../assets/bkwdslogo.png"

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
  margin-right: 90px;
  text-align: center;
  justify-content: space-around;

  a {
    font-size: 23px;
    color: white !important;
  }
`

class Nav extends Component {
  render() {
    return (
      <NavigationMenu>
        <div>
          <Img src={logo} />
        </div>
        <Menu>
          <a>Features</a>
          <a>About</a>
          <a>Log in</a>
          <a>Sign Up</a>
        </Menu>
      </NavigationMenu>
    )
  }
}

export default Nav
