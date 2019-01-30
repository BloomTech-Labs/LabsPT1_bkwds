import React from "react"
import styled from "styled-components"

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(./images/hikerscontent.png);
  background-size: cover;
  height: 100vh;
  width: 100vw;
`

const BrandedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  justify-content: center;
  margin-top: 53px;
  margin-right: 10rem;

  h1 {
    color: white !important;
    font-weight: bold;
  }

  a {
    color: white !important;
  }

  .accent {
    color: #f26a21 !important;
    font-weight: bold;
  }
`

const LandingPageContent = () => {
  return (
    <ContentContainer>
      <BrandedContent>
        <h1>
          bkwds<span className="accent">.</span>
        </h1>
        <h1>
          <span className="accent">+</span>go there
        </h1>
      </BrandedContent>
    </ContentContainer>
  )
}

export default LandingPageContent
