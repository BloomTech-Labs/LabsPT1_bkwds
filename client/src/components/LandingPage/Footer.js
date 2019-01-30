import React from "react"
import styled from "styled-components"

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 100px 100px;
  grid-template-areas: "logo logo menu terms social join";
  height: 100%;
  width: 100%;
  padding: 5% 0;
  align-content: center;
  background-color: #222222;

  button {
    display: block;
    margin: 0 0 1rem;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    text-decoration: none;
    color: white;
    font-size: 0.9rem;
    letter-spacing: 1.25px;
  }

  h5 {
    margin-bottom: 2rem;
    color: #646565;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 1.25px;
  }

  .logo {
    grid-area: logo;
  }

  .menu {
    grid-area: menu;
  }

  .terms {
    grid-area: terms;
    margin-top: 55px;
  }

  .social {
    grid-area: social;
  }

  .join {
    grid-area: join;
  }
`

const Img = styled.img`
  width: 114px;
  margin-left: 90px;
`

const Footer = () => (
  <FooterContainer>
    <div className="logo">
      <Img src="/images/bkwdslogo.png" />
    </div>
    <div className="menu">
      <h5>Menu</h5>
      <button>Features</button>
      <button>About</button>
      <button>Community</button>
      <button>Support</button>
    </div>
    <div className="terms">
      <button>Business</button>
      <button>Terms</button>
      <button>Policy</button>
    </div>
    <div className="social">
      <h5>Follow</h5>
      <button>Facebook</button>
      <button>Twitter</button>
      <button>Instagram</button>
    </div>
    <div className="join">
      <h5>Get started</h5>
      <button>Sign Up</button>
      <button>Login</button>
    </div>
  </FooterContainer>
)

export default Footer
