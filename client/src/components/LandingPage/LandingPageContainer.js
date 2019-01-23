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
  flex-direction: end;
  text-align: center;
  justify-content: space-around;

  a {
    font-size: 20px;
    color: white !important;
  }

  .accent {
    color: #f26a21 !important;
  }
`

const PageContentContainer = () => {
  return (
    <ContentContainer>
      <BrandedContent>
        <a>
          bkwds<span className="accent">.</span>
        </a>
        <a>
          <span className="accent">+</span>go there
        </a>
      </BrandedContent>{" "}
      />
    </ContentContainer>
  )
}

export default PageContentContainer
