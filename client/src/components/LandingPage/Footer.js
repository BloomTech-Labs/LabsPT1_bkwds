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

  h5 {
    margin-bottom: 2rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #646565;
  }

  p {
    font-size: 0.9rem;
    color: white !important;
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
      <p>
        <a>Features</a>
      </p>
      <p>
        <a>About</a>
      </p>
      <p>
        <a>Community</a>
      </p>
      <p>
        <a>Support</a>
      </p>
    </div>
    <div className="terms">
      <p>
        <a>Business</a>
      </p>
      <p>
        <a>Terms</a>
      </p>
      <p>
        <a>Policy</a>
      </p>
    </div>
    <div className="social">
      <h5>Follow</h5>
      <p>
        <a>Facebook</a>
      </p>
      <p>
        <a>Twitter</a>
      </p>
      <p>
        <a>Instagram</a>
      </p>
    </div>
    <div className="join">
      <h5>Get started</h5>
      <p>
        <a>Sign Up</a>
      </p>
      <p>
        <a>Login</a>
      </p>
    </div>
  </FooterContainer>
)

export default Footer
