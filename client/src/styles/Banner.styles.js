import styled, { keyframes, css } from "styled-components"
import { media } from "./theme/mixins"

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
    height: 60px;
    ${media.tablet`height: 70px;`}

    color: ${props => props.theme.white};
    background-color: ${props => props.theme.secondaryDark};
    /* background-color: #0e153f; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1 100%;
    padding-left: 10%;
    ${media.phone`padding-left: 0.8rem`};

    span {
      font-weight: 400;
      font-size: 1.125rem;
    }
    span.banner-title {
      color: ${props => props.theme.white};
    }
    span.banner-app-name {
      color: ${props => props.theme.white};
      font-size: 1.125rem;
      ${media.phone`font-size: .8rem`};
    }
    span.banner-rotating-tagline {
      color: ${props => props.theme.primaryLight};
      font-style: italic;
      ${media.phone`font-size: .8rem`};
    }
  }
`
