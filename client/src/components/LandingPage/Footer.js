import React from "react"
import styled from "styled-components"

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 100px 100px;
  grid-template-areas: "a a b c d e";
  background-color: #222222;
  height: 40vh;
  width: 100vw;
  padding-top: 5%;
  alight-content: center;
  h5 {
    color: #646565 !important;
    margin-bottom: 2.5rem;
  }
  p {
    color: white !important;
    margin-bottom: 2rem;
  }

  .logo {
    grid-area: a;
  }
  .menu {
    grid-area: b;
  }
  .terms {
    grid-area: c;
    margin-top: 50px;
  }
  .follow {
    grid-area: d;
  }
  .Join {
    grid-area: e;
  }
`

const Img = styled.img`
  width: 228px;
  margin-left: 90px;
`

const Footer = () => {
  return (
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
      <div>
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
      <div>
        <h5>Join</h5>
        <p>
          <a>Sign Up</a>
        </p>
        <p>
          <a>Login</a>
        </p>
      </div>
    </FooterContainer>
  )
}

export default Footer
