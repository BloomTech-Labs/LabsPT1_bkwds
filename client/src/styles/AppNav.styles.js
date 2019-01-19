import styled from "styled-components"
import { boxShadowMixin } from "./theme/mixins"

export const NavStyles = styled.div`
  background: ${props => props.theme.white};
  min-height: ${props => props.theme.navHeight};

  /* relative positioning so that nav-links-cta 
     can position absolute with Nav as its parent */
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${boxShadowMixin};

  padding-left: 0.5rem;
  padding-right: 1.25rem;

  .nav-links-wrapper {
    /* This is to offset the Github logo bc of its absolute position */
    margin-right: 60px;
  }
  .logo {
    color: ${props => props.theme.primary};
    font-weight: 700;
    font-size: 1.75rem;
    letter-spacing: -0.0275rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-left: 10px;
  }
  .hamburger-icon-wrapper {
    display: flex;
  }
  .hamburger-icon {
    display: flex;
    margin-right: 20px;
  }

  ul {
    display: flex;
    flex-direction: row;
  }

  li {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  a {
    display: flex;
    align-items: center;
    height: 3.125rem;
    padding-left: 8px;
    padding-right: 8px;
    color: ${props => props.theme.midGray};
    font-size: 1.0625rem;
    font-weight: 400;
    &:hover {
      color: ${props => props.theme.primary};
    }
  }

  button {
    cursor: pointer;
    border: none;
    &:hover {
      text-decoration: underline;
    }
    padding-top: 0;
    padding-bottom: 0;
  }

  ul.authenticated-links {
    li {
      padding-left: 14px;
      padding-right: 14px;
    }
  }

  .call-to-action {
    position: absolute;
    top: 0;
    right: 1.25rem;
    height: 100%;
    & a {
      height: 100%;
    }
  }
`
