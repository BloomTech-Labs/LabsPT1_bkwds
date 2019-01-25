import React from "react"
import styled from "styled-components"
import ButtonCTA from "./ButtonCTA"
import GoogleIcon from "../icons/GoogleIcon"
import { loginWithOauth } from "../../redux/actions/auth"

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-image: url(./images/hikerscontent2.png);
  background-size: cover;
  justify-content: center;
  height: 60vh;
  width: 100vw;
`

const BrandedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  margin-top: 53px;
  margin-right: 2rem;
  align-items: center;

  h3 {
    color: white !important;
  }

  a {
    color: white !important;
  }

  .accent {
    color: #f26a21 !important;
    font-weight: bold;
  }


  .googleSignIn {
      height: 55px;
      width: 200px;
      margin: 3rem
      border-radius: 12px;
  }
`

const FooterContent = () => {
  return (
    <ContentContainer>
      <BrandedContent>
        <h3>
          Explore without boundaries<span className="accent">.</span>
        </h3>
        <ButtonCTA />
        <button className="googleSignIn" width="300px" onClick={loginWithOauth}>
          <GoogleIcon /> Log in with Google
        </button>
      </BrandedContent>
    </ContentContainer>
  )
}

export default FooterContent
