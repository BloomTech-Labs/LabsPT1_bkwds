import styled, { keyframes, css } from "styled-components"

// Seconds btwn animations / new tagline generation:

const animation = keyframes`
  0% { opacity: 0; }
  20% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; }
`

const animationRule = css`
  ${animation} ${props => props.seconds}s infinite ease;
`

export const Banner = styled.div`
  /* Apply animations */
  .banner-rotating-tagline {
    animation: ${animationRule};
    animation-delay: 0s;
    opacity: 1;
  }

  .landing-page-banner {
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.primaryDark};
    /* background-color: #0e153f; */
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1 100%;
    padding-left: 10%;

    span {
      font-weight: 400;
      font-size: 1.125rem;
    }
    span.banner-title {
      color: ${props => props.theme.white};
    }
    span.banner-app-name {
      color: ${props => props.theme.white};
      margin-right: 1.5rem;
      font-size: 1.5rem;
    }
    span.banner-rotating-tagline {
      font-style: italic;
    }
  }
`
